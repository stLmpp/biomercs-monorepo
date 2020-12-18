import { IsDefined, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IsNumber } from '@biomercs/api-validation';
import { PlayerAdd, PlayerUpdate } from '@biomercs/api-dto';

export class PlayerAddDto implements PlayerAdd {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(3)
  personaName!: string;

  @IsNumber()
  @IsOptional()
  idUser?: number;

  @IsNumber()
  @IsOptional()
  idSteamProfile?: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  aboutMe?: string;

  @IsOptional()
  @IsNumber()
  idRegion?: number;
}

export class PlayerUpdateDto implements PlayerUpdate {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  personaName?: string;

  @IsNumber()
  @IsOptional()
  idUser?: number;

  @IsNumber()
  @IsOptional()
  idSteamProfile?: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  aboutMe?: string;

  @IsOptional()
  @IsNumber()
  idRegion?: number;
}
