import { IsDefined, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { IsNumber } from '@biomercs/api-interfaces';

export class ModeAddDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsDefined()
  @IsNumber()
  @Min(1)
  playerQuantity!: number;
}

export class ModeUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
