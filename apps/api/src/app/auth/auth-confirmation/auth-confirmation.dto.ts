import { IsDefined } from 'class-validator';
import { IsDate, IsNumber } from '@biomercs/api-validation';

export class AuthConfirmationAddDto {
  @IsDefined()
  @IsNumber()
  idUser!: number;

  @IsDefined()
  @IsNumber()
  code!: number;

  @IsDefined()
  @IsDate()
  expirationDate!: Date;
}
