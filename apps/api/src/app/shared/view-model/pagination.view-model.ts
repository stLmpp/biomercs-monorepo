import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationMetaViewModel implements IPaginationMeta {
  currentPage!: number;
  itemCount!: number;
  itemsPerPage!: number;
  totalItems!: number;
  totalPages!: number;
}

export class PaginationLinksViewModel implements IPaginationLinks {
  @ApiPropertyOptional()
  first?: string;

  @ApiPropertyOptional()
  previous?: string;

  @ApiPropertyOptional()
  next?: string;

  @ApiPropertyOptional()
  last?: string;
}
