import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Control, ControlBuilder, ControlValidator, ValidatorsModel } from '@stlmpp/control';
import { Nullable } from '../type/nullable';
import { PlatformQuery } from '../services/platform/platform.query';
import { GameService } from '../services/game/game.service';
import { MiniGameService } from '../services/mini-game/mini-game.service';
import { ModeService } from '../services/mode/mode.service';
import { filterNil } from '../operators/filter';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { StageService } from '../services/stage/stage.service';
import { trackByFactory } from '@stlmpp/utils';
import { Character, CharacterCostume, Game, MiniGame, Mode, Platform, Stage } from '@biomercs/api-interfaces';
import { StateComponent } from '../components/common/state-component';
import { CharacterService } from '../services/character/character.service';

interface ParamsForm {
  idPlatform: Nullable<number>;
  idGame: Nullable<number>;
  idMiniGame: Nullable<number>;
  idMode: Nullable<number>;
  idStage: Nullable<number>;
  idCharacterCostume: Nullable<number>;
}

const ids: (keyof ParamsForm)[] = ['idPlatform', 'idGame', 'idMiniGame', 'idMode', 'idStage', 'idCharacterCostume'];

export interface ParamConfig {
  validators?: ControlValidator[];
  errorMessages?: Record<keyof ValidatorsModel, string>;
  show?: boolean;
}

export type ParamsConfig = Record<keyof ParamsForm, ParamConfig>;

const defaultConfigs: ParamsConfig = {
  idCharacterCostume: { show: true },
  idPlatform: { show: true },
  idStage: { show: true },
  idMode: { show: true },
  idMiniGame: { show: true },
  idGame: { show: true },
};

@Component({
  selector: 'bio-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['idPlatform', 'idGame', 'idMiniGame', 'idMode', 'idStage', 'idCharacterCostume'],
})
export class ParamsComponent
  extends StateComponent<{
    gameLoading: boolean;
    miniGameLoading: boolean;
    modeLoading: boolean;
    stageLoading: boolean;
    characterLoading: boolean;
  }>
  implements OnChanges, OnInit {
  constructor(
    private controlBuilder: ControlBuilder,
    private platformQuery: PlatformQuery,
    private gameService: GameService,
    private miniGameService: MiniGameService,
    private modeService: ModeService,
    private stageService: StageService,
    private characterService: CharacterService
  ) {
    super({
      gameLoading: false,
      miniGameLoading: false,
      modeLoading: false,
      stageLoading: false,
      characterLoading: false,
    });
  }

  @Input()
  set config(config: Partial<ParamsConfig>) {
    this.formsConfig = ids.reduce(
      (acc, key) => ({ ...acc, [key]: { ...defaultConfigs[key], ...config[key] } }),
      {} as ParamsConfig
    );
  }

  @Input() set params(params: Partial<ParamsForm>) {
    this.form.patchValue(params);
  }

  @Output() idPlatformChange = new EventEmitter<Nullable<number>>();
  @Output() idGameChange = new EventEmitter<Nullable<number>>();
  @Output() idMiniGameChange = new EventEmitter<Nullable<number>>();
  @Output() idModeChange = new EventEmitter<Nullable<number>>();
  @Output() idStageChange = new EventEmitter<Nullable<number>>();
  @Output() idCharacterCostumeChange = new EventEmitter<Nullable<number>>();
  @Output() paramsChange = new EventEmitter<ParamsForm>();

  formsConfig = defaultConfigs;

  form = this.controlBuilder.group<ParamsForm>({
    idPlatform: null,
    idGame: null,
    idMiniGame: null,
    idMode: null,
    idStage: null,
    idCharacterCostume: null,
  });

  get idPlatformControl(): Control<Nullable<number>> {
    return this.form.get('idPlatform');
  }
  get idGameControl(): Control<Nullable<number>> {
    return this.form.get('idGame');
  }
  get idMiniGameControl(): Control<Nullable<number>> {
    return this.form.get('idMiniGame');
  }
  get idModeControl(): Control<Nullable<number>> {
    return this.form.get('idMode');
  }
  get idStageControl(): Control<Nullable<number>> {
    return this.form.get('idStage');
  }
  get idCharacterCostumeControl(): Control<Nullable<number>> {
    return this.form.get('idCharacterCostume');
  }

  idPlatform$ = this.form.get('idPlatform').value$.pipe(filterNil(), distinctUntilChanged());
  idGame$ = this.form.get('idGame').value$.pipe(filterNil(), distinctUntilChanged());
  idMiniGame$ = this.form.get('idMiniGame').value$.pipe(filterNil(), distinctUntilChanged());
  idMode$ = this.form.get('idMode').value$.pipe(filterNil(), distinctUntilChanged());
  idModeSelected$ = this.form.get('idMode').value$.pipe(
    distinctUntilChanged(),
    map(idMode => !!idMode)
  );

  platforms$ = this.platformQuery.all$.pipe(
    tap(() => {
      const idPlatform = this.idPlatformControl.value;
      if (idPlatform) {
        this.idPlatformControl.setValue(idPlatform);
      }
    })
  );
  games$ = this.idPlatform$.pipe(
    switchMap(idPlatform => {
      this.updateState('gameLoading', true);
      return this.gameService.findByIdPlatform(idPlatform).pipe(
        finalize(() => {
          this.updateState('gameLoading', false);
        }),
        tap(games => {
          const control = this.idGameControl;
          const idGame = control.value;
          if (idGame) {
            const selected = games.find(game => game.id === idGame);
            if (selected) {
              control.setValue(selected.id);
            } else {
              control.setValue(null);
            }
          }
        })
      );
    })
  );
  miniGames$ = combineLatest([this.idPlatform$, this.idGame$]).pipe(
    debounceTime(0),
    switchMap(([idPlatform, idGame]) => {
      this.updateState('miniGameLoading', true);
      return this.miniGameService.findByIdPlatformGame(idPlatform, idGame).pipe(
        finalize(() => {
          this.updateState('miniGameLoading', false);
        }),
        tap(miniGames => {
          const control = this.idMiniGameControl;
          const idMiniGame = control.value;
          if (idMiniGame) {
            const selected = miniGames.find(miniGame => miniGame.id === idMiniGame);
            if (selected) {
              control.setValue(selected.id);
            } else {
              control.setValue(null);
            }
          }
        })
      );
    })
  );
  modes$ = combineLatest([this.idPlatform$, this.idGame$, this.idMiniGame$]).pipe(
    debounceTime(0),
    switchMap(([idPlatform, idGame, idMiniGame]) => {
      this.updateState('modeLoading', true);
      return this.modeService.findByIdPlatformGameMiniGame(idPlatform, idGame, idMiniGame).pipe(
        finalize(() => {
          this.updateState('modeLoading', false);
        }),
        tap(modes => {
          const control = this.idModeControl;
          const idMode = control.value;
          if (idMode) {
            const selected = modes.find(mode => mode.id === idMode);
            if (selected) {
              control.setValue(selected.id);
            } else {
              control.setValue(null);
            }
          }
        })
      );
    })
  );
  stages$ = combineLatest([this.idPlatform$, this.idGame$, this.idMiniGame$, this.idMode$]).pipe(
    debounceTime(0),
    switchMap(([idPlatform, idGame, idMiniGame, idMode]) => {
      this.updateState('stageLoading', true);
      return this.stageService.findByIdPlatformGameMiniGameMode(idPlatform, idGame, idMiniGame, idMode).pipe(
        finalize(() => {
          this.updateState('stageLoading', false);
        }),
        tap(stages => {
          const control = this.idStageControl;
          const idStage = control.value;
          if (idStage) {
            const selected = stages.find(stage => stage.id === idStage);
            if (selected) {
              control.setValue(selected.id);
            } else {
              control.setValue(null);
            }
          }
        })
      );
    })
  );
  characters$ = combineLatest([this.idPlatform$, this.idGame$, this.idMiniGame$, this.idMode$]).pipe(
    debounceTime(0),
    switchMap(([idPlatform, idGame, idMiniGame, idMode]) => {
      this.updateState('characterLoading', true);
      return this.characterService.findByIdPlatformGameMiniGameMode(idPlatform, idGame, idMiniGame, idMode).pipe(
        finalize(() => {
          this.updateState('characterLoading', false);
        }),
        tap(characters => {
          const characterCostumes = characters.reduce(
            (acc, character) => [...acc, ...character.characterCostumes],
            [] as CharacterCostume[]
          );
          const control = this.idCharacterCostumeControl;
          const idCharacterCostume = control.value;
          if (idCharacterCostume) {
            const selected = characterCostumes.find(characterCostume => characterCostume.id === idCharacterCostume);
            if (selected) {
              control.setValue(selected.id);
            } else {
              control.setValue(null);
            }
          }
        })
      );
    })
  );

  state$ = this.selectState();

  trackByPlatform = trackByFactory<Platform>('id');
  trackByGame = trackByFactory<Game>('id');
  trackByMiniGame = trackByFactory<MiniGame>('id');
  trackByMode = trackByFactory<Mode>('id');
  trackByStage = trackByFactory<Stage>('id');
  trackByCharacter = trackByFactory<Character>('id');
  trackByCharacterCostume = trackByFactory<CharacterCostume>('id');
  trackByControlValidator = trackByFactory<ControlValidator>('name');

  ngOnInit(): void {
    for (const id of ids) {
      const control = this.form.get(id);
      const formConfig = this.formsConfig[id];
      if (formConfig.show) {
        control.valueChanges$.pipe(takeUntil(this.destroy$)).subscribe(idValue => {
          (this as any)[id + 'Change'].next(idValue);
        });
      }
      if (formConfig.validators) {
        control.setValidators(formConfig.validators);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const params: Partial<ParamsForm> = {};
    for (const [key, change] of Object.entries(changes) as [keyof ParamsForm, SimpleChange][]) {
      if (ids.includes(key)) {
        params[key] = change.currentValue;
      }
    }
    this.form.patchValue(params);
  }
}
