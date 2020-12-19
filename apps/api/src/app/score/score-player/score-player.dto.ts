import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { IsNumber } from '@biomercs/api-validation';
import { ScorePlayerAdd } from '@biomercs/api-dto';

export class ScorePlayerAddDto implements ScorePlayerAdd {
  @IsDefined()
  @IsNumber()
  idPlayer!: number;

  @IsDefined()
  @IsNumber()
  idCharacterCostume!: number;

  @IsOptional()
  @IsBoolean()
  host?: boolean;

  @IsDefined()
  @IsNumber()
  @Min(0)
  bulletKills!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  evidence!: string;
}
