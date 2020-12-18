import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

export const getUserFromContext = (ctx: ExecutionContext): UserEntity => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  if (user) {
    user.token = req.headers.authorization?.replace('Bearer ', '');
  }
  return user ?? { id: -1 };
};

export const AuthUser = createParamDecorator((data: any, ctx: ExecutionContext): UserEntity => getUserFromContext(ctx));
