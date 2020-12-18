import { IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IsNumber } from '@biomercs/api-validation';
import { AuthChangePassword, AuthCredentials, AuthRegister, AuthRegisterSteam } from '@biomercs/api-dto';

export class AuthRegisterDto implements AuthRegister {
  @IsString()
  @IsDefined()
  @MinLength(3)
  username!: string;

  @IsString()
  @IsDefined()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsDefined()
  @IsEmail()
  email!: string;
}

export class AuthCredentialsDto implements AuthCredentials {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}

export class AuthChangePasswordDto implements AuthChangePassword {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password!: string;

  @IsNumber()
  @IsDefined()
  confirmationCode!: number;
}

export class AuthRegisterSteamDto implements AuthRegisterSteam {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  steamid!: string;
}
