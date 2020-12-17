import { IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IsNumber } from '../validation/is-number';

export class AuthRegisterDto {
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

export class AuthCredentialsDto {
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

export class AuthChangePasswordDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password!: string;

  @IsNumber()
  @IsDefined()
  confirmationCode!: number;
}

export class AuthRegisterSteamDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  steamid!: string;
}
