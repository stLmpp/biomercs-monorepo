import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserUpdateDto } from './user.dto';
import { ApiAuth } from '../auth/api-auth.decorator';
import { RouteParam } from '@biomercs/api-interfaces';

@ApiAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch(`:${RouteParam.idUser}`)
  async update(@Param(RouteParam.idUser) idUser: number, @Body() dto: UserUpdateDto): Promise<UserEntity> {
    return this.userService.update(idUser, dto);
  }
}
