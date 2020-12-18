import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity } from '../user/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  constructor(@Inject(REQUEST) public request: Request) {}

  get user(): UserEntity {
    return (this.request.user as UserEntity) ?? ({ id: -1 } as UserEntity);
  }
}
