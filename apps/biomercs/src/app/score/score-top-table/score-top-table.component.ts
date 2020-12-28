import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { ParamsForm } from '../../shared/params/params.component';
import { Control, ControlBuilder } from '@stlmpp/control';
import { ScoreService } from '../score.service';
import { debounceTime, filter, finalize, map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';
import { orderBy, OrderByDirection, trackByFactory } from '@stlmpp/utils';
import { PaginationMetaVW, RouteParam, ScoreTableVW, ScoreTopTableVW, ScoreVW, Stage } from '@biomercs/api-interfaces';
import { StateComponent } from '../../shared/components/common/state-component';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChangedObject } from '../../util/operators/distinct-until-changed-object';

interface TopTableForm extends ParamsForm {
  page: number;
  itemsPerPage: number;
}

@Component({
  selector: 'bio-score-top-table',
  templateUrl: './score-top-table.component.html',
  styleUrls: ['./score-top-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreTopTableComponent
  extends StateComponent<{
    tableLoading: boolean;
    orderBy?: number;
    orderByDirection?: OrderByDirection;
    orderByType?: 'stage' | 'total' | 'player';
  }>
  implements OnInit {
  constructor(
    private controlBuilder: ControlBuilder,
    private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute
  ) {
    super({ tableLoading: false, orderByDirection: 'desc', orderByType: 'total' });
  }

  form = this.controlBuilder.group<TopTableForm>({
    idPlatform: this._getParamOrNull(RouteParam.idPlatform),
    idGame: this._getParamOrNull(RouteParam.idGame),
    idMiniGame: this._getParamOrNull(RouteParam.idMiniGame),
    idMode: this._getParamOrNull(RouteParam.idMode),
    idStage: this._getParamOrNull(RouteParam.idStage),
    idCharacterCostume: this._getParamOrNull(RouteParam.idCharacterCostume),
    itemsPerPage: +(this.activatedRoute.snapshot.queryParamMap.get(RouteParam.itemsPerPage) ?? 10),
    page: +(this.activatedRoute.snapshot.queryParamMap.get(RouteParam.page) ?? 1),
  });

  get pageControl(): Control<number> {
    return this.form.get('page');
  }

  get itemsPerPageControl(): Control<number> {
    return this.form.get('itemsPerPage');
  }

  tableLoading$ = this.selectState('tableLoading');
  order$ = this.selectStateMulti(['orderBy', 'orderByDirection', 'orderByType']);

  scoreTopTable$ = this.form.value$.pipe(
    debounceTime(100),
    distinctUntilChangedObject(),
    filter(params => !!params.idPlatform && !!params.idGame && !!params.idMiniGame && !!params.idMode),
    switchMap(params => {
      this.updateState('tableLoading', true);
      return this.scoreService
        .findTopScoresTable(
          params.idPlatform!,
          params.idGame!,
          params.idMiniGame!,
          params.idMode!,
          params.page,
          params.itemsPerPage
        )
        .pipe(
          finalize(() => {
            this.updateState('tableLoading', false);
          })
        );
    }),
    shareReplay()
  );

  scoreTopTableOrdered$: Observable<ScoreTopTableVW> = combineLatest([
    this.scoreTopTable$,
    this.selectState('orderBy'),
    this.selectState('orderByDirection'),
    this.selectState('orderByType'),
  ]).pipe(
    debounceTime(50),
    map(([scoreTable, idStage, orderByDiretion, orderByType]) => {
      orderByDiretion ??= 'asc';
      switch (orderByType) {
        case 'stage': {
          if (!idStage) {
            return scoreTable;
          }
          const findScore = (value: ScoreTableVW): number =>
            value.scores.find(score => score?.idStage === idStage)?.score ?? 0;
          const compare: (valueA: ScoreTableVW, valueB: ScoreTableVW) => number =
            orderByDiretion === 'asc'
              ? (valueA, valueB) => findScore(valueA) - findScore(valueB)
              : (valueA, valueB) => findScore(valueB) - findScore(valueA);
          return {
            ...scoreTable,
            scoreTables: [...scoreTable.scoreTables].sort((valueA, valueB) => compare(valueA, valueB)),
          };
        }
        case 'player': {
          return {
            ...scoreTable,
            scoreTables: orderBy(scoreTable.scoreTables, 'personaName', orderByDiretion),
          };
        }
        default: {
          return {
            ...scoreTable,
            scoreTables: orderBy(scoreTable.scoreTables, 'total', orderByDiretion),
          };
        }
      }
    })
  );

  paginationMeta$: Observable<PaginationMetaVW> = this.scoreTopTable$.pipe(
    pluck('meta'),
    tap(meta => {
      if (meta.currentPage > meta.totalPages) {
        this.changePage(meta.totalPages);
      }
    })
  );

  trackByStage = trackByFactory<Stage>('id');
  trackByPlayer = trackByFactory<ScoreTableVW>('idPlayer');

  private _getParamOrNull(param: RouteParam): number | null {
    return this.activatedRoute.snapshot.queryParamMap.has(param)
      ? +this.activatedRoute.snapshot.queryParamMap.get(param)!
      : null;
  }

  trackByScore: TrackByFunction<ScoreVW | undefined> = (index, item) => (item ? item.idScore : index);

  updateOrderByStage(idStage?: number): void {
    if (idStage && idStage === this.getState('orderBy')) {
      this.updateState('orderByDirection', this.getState('orderByDirection') === 'asc' ? 'desc' : 'asc');
    } else {
      this.updateState({ orderByType: 'stage', orderBy: idStage });
    }
  }

  updateOrderByTotal(): void {
    if (this.getState('orderByType') === 'total') {
      this.updateState('orderByDirection', this.getState('orderByDirection') === 'asc' ? 'desc' : 'asc');
    } else {
      this.updateState({ orderByType: 'total', orderBy: undefined });
    }
  }

  updateOrderByPlayer(): void {
    if (this.getState('orderByType') === 'player') {
      this.updateState('orderByDirection', this.getState('orderByDirection') === 'asc' ? 'desc' : 'asc');
    } else {
      this.updateState({ orderByType: 'player', orderBy: undefined });
    }
  }

  changeItemsPerPage($event: number): void {
    this.itemsPerPageControl.setValue($event);
  }

  changePage($event: number): void {
    this.pageControl.setValue($event);
  }

  paramsChange($event: ParamsForm): void {
    this.form.patchValue({ ...$event, page: 1 });
  }

  ngOnInit(): void {}
}