import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PaginationMetaVW, RouteParam } from '@biomercs/api-interfaces';
import { Router } from '@angular/router';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'pagination' },
})
export class PaginationComponent implements OnChanges, PaginationMetaVW {
  constructor(private router: Router) {}

  private _setQueryParamsOnChange = false;

  @Input()
  set setQueryParamsOnChange(setQueryParamsOnChange: boolean) {
    this._setQueryParamsOnChange = coerceBooleanProperty(setQueryParamsOnChange);
  }

  @Input() currentPage!: number;
  @Input() itemCount!: number;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Input() totalPages!: number;

  @Input() itemsPerPageOptions = [5, 10, 25, 50, 100];

  @Input()
  set meta({ totalPages, totalItems, itemsPerPage, itemCount, currentPage }: PaginationMetaVW) {
    this.currentPage = currentPage;
    this.itemCount = itemCount;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
  }

  @Output() nextPage = new EventEmitter<number>();
  @Output() previousPage = new EventEmitter<number>();
  @Output() firstPage = new EventEmitter<number>();
  @Output() lastPage = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();

  private _setQueryParams(): void {
    if (!this._setQueryParamsOnChange) {
      return;
    }
    this.router
      .navigate([], {
        queryParams: { [RouteParam.page]: this.currentPage, [RouteParam.itemsPerPage]: this.itemsPerPage },
        queryParamsHandling: 'merge',
      })
      .then();
  }

  onNextPage(): void {
    this.currentPage++;
    this.nextPage.emit(this.currentPage);
    this.currentPageChange.emit(this.currentPage);
    this._setQueryParams();
  }

  onPreviousPage(): void {
    this.currentPage--;
    this.previousPage.emit(this.currentPage);
    this.currentPageChange.emit(this.currentPage);
    this._setQueryParams();
  }

  onFirstPage(): void {
    this.currentPage = 1;
    this.firstPage.emit(this.currentPage);
    this.currentPageChange.emit(this.currentPage);
    this._setQueryParams();
  }

  onLastPage(): void {
    this.currentPage = this.totalPages;
    this.lastPage.emit(this.currentPage);
    this.currentPageChange.emit(this.currentPage);
    this._setQueryParams();
  }

  ngOnChanges(): void {
    this._setQueryParams();
  }

  static ngAcceptInputType_setQueryParamsOnChange: BooleanInput;
}
