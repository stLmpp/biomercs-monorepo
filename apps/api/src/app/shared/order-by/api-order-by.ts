import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { RouteParam } from '@biomercs/api-interfaces';

export function ApiOrderBy(required = false): any {
  return applyDecorators(ApiQuery({ name: RouteParam.orderBy, description: 'Ordernar por', required, type: String }));
}

export function ApiOrderByDirection(required = false): any {
  return applyDecorators(
    ApiQuery({ name: RouteParam.orderByDirection, description: 'Ordenação', required, enum: ['ASC', 'DESC'] })
  );
}

export function ApiOrderByAndDir(required = false): any {
  return applyDecorators(ApiOrderBy(required), ApiOrderByDirection(required));
}
