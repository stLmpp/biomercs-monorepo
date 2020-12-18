import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRegisterViewModel } from './auth.view-model';
import { RouteParam } from '@biomercs/api-interfaces';
import { HeaderParams } from '../shared/type/params';
import { UserEntity } from '../user/user.entity';
import { ApiAuth } from './api-auth.decorator';
import { AuthUser } from './auth-user.decorator';
import { UserService } from '../user/user.service';
import { SteamService } from '../steam/steam.service';
import { Request, Response } from 'express';
import { AuthChangePasswordDto, AuthCredentialsDto, AuthRegisterDto, AuthRegisterSteamDto } from './auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private steamService: SteamService) {}

  @Post('register')
  async register(@Body() dto: AuthRegisterDto): Promise<AuthRegisterViewModel> {
    return this.authService.register(dto);
  }

  @ApiOkResponse()
  @Post('login')
  async login(@Body() dto: AuthCredentialsDto): Promise<UserEntity> {
    return this.authService.login(dto);
  }

  @HttpCode(200)
  @ApiAuth()
  @Post('auto-login')
  async autoLogin(@AuthUser() user: UserEntity): Promise<UserEntity> {
    if (user.id === -1) {
      throw new UnauthorizedException();
    }
    const newUser = await this.userService.update(user.id, { lastOnline: new Date() });
    if (!newUser) {
      throw new NotFoundException('User not found');
    }
    newUser.token = await this.authService.getToken(user);
    return newUser.removePasswordAndSalt();
  }

  @Post(`user/:${RouteParam.idUser}/resend-code`)
  async resendConfirmationCode(@Param(RouteParam.idUser) idUser: number): Promise<void> {
    return this.authService.resendConfirmationCode(idUser);
  }

  @Post(`user/:${RouteParam.idUser}/confirm-code/:${RouteParam.confirmationCode}`)
  async confirmCode(
    @Param(RouteParam.idUser) idUser: number,
    @Param(RouteParam.confirmationCode) confirmationCode: number
  ): Promise<UserEntity> {
    return this.authService.confirmCode(idUser, confirmationCode);
  }

  @ApiQuery({ name: RouteParam.email, required: false })
  @ApiQuery({ name: RouteParam.username, required: false })
  @Get(`user/exists`)
  async userExists(
    @Query(RouteParam.email) email?: string,
    @Query(RouteParam.username) username?: string
  ): Promise<boolean> {
    return this.userService.anyByEmailOrUsername(username, email);
  }

  @HttpCode(200)
  @Post(`steam/login/:${RouteParam.uuid}`)
  async loginSteam(@Param(RouteParam.uuid) uuid: string): Promise<string> {
    return this.steamService.openIdUrl(`/auth/steam/login/${uuid}/return`);
  }

  @Get(`steam/login/:${RouteParam.uuid}/return`)
  async loginSteamReturn(
    @Req() req: Request,
    @Res() res: Response,
    @Query(RouteParam.openidReturnTo) returnUrl: string,
    @Param(RouteParam.uuid) uuid: string
  ): Promise<void> {
    const steamProfile = await this.steamService.authenticate(req, returnUrl);
    await this.authService.authSteam(steamProfile.steamid, uuid);
    res.send(`Logged succesfully! You can close this window, if it's not closed automatically`);
  }

  @Post(`steam/register`)
  async registerSteam(
    @Body() dto: AuthRegisterSteamDto,
    @Headers(HeaderParams.authorizationSteam) auth: string
  ): Promise<AuthRegisterViewModel> {
    return this.authService.registerSteam(dto, auth);
  }

  @HttpCode(200)
  @Post(`steam/:${RouteParam.steamid}/validate-token`)
  async validateSteamToken(
    @Param(RouteParam.steamid) steamid: string,
    @Headers(HeaderParams.authorizationSteam) token: string
  ): Promise<boolean> {
    return this.authService.validateSteamToken(steamid, token);
  }

  @HttpCode(200)
  @Post('forgot-password')
  async sendForgotPasswordConfirmationCode(@Query(RouteParam.email) email: string): Promise<void> {
    return this.authService.sendForgotPasswordConfirmationCode(email);
  }

  @Post(`forgot-password/change-password`)
  async changeForgottenPassword(@Body() dto: AuthChangePasswordDto): Promise<UserEntity> {
    return this.authService.changeForgottenPassword(dto);
  }
}
