import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { UserEntity } from '../../user/user.entity';

@Entity()
export class AuthConfirmationEntity extends BaseEntity {
  @Column()
  code!: number;

  @Column()
  expirationDate!: Date;

  @Column()
  idUser!: number;

  @ManyToOne(() => UserEntity, user => user.authConfirmations)
  @JoinColumn()
  user!: UserEntity;
}
