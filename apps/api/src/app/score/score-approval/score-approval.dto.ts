import { ScoreApprovalAdd } from '@biomercs/api-dto';
import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsDate, IsNumber } from '@biomercs/api-validation';
import { ScoreApprovalActionEnum } from './score-approval-action.enum';

export class ScoreApprovalAddDto implements ScoreApprovalAdd {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description!: string;

  @IsNumber()
  @IsDefined()
  idScoreApprovalMotive!: number;
}

export class ScoreApprovalAddAdminDto extends ScoreApprovalAddDto {
  @IsDefined()
  @IsNumber()
  idUser!: number;

  @IsDefined()
  @IsEnum(ScoreApprovalActionEnum)
  action!: ScoreApprovalActionEnum;

  @IsDefined()
  @IsDate()
  actionDate!: Date;

  @IsNumber()
  @IsDefined()
  idScore!: number;
}

export class ScoreApprovalAddPlayerDto extends ScoreApprovalAddDto {
  @IsDefined()
  @IsNumber()
  idPlayer!: number;

  @IsDefined()
  @IsEnum(ScoreApprovalActionEnum)
  action!: ScoreApprovalActionEnum;

  @IsDefined()
  @IsDate()
  actionDate!: Date;

  @IsNumber()
  @IsDefined()
  idScore!: number;
}
