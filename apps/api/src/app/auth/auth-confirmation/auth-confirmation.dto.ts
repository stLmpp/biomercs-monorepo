import { IsDate, IsNumber } from '@biomercs/api-interfaces';
import { IsDefined } from 'class-validator';

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
