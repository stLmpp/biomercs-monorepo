import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { hash } from 'bcryptjs';
import { PlayerEntity } from '../player/player.entity';
import { AuthConfirmationEntity } from '../auth/auth-confirmation/auth-confirmation.entity';
import { User } from '@biomercs/api-interfaces';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  @ApiHideProperty()
  password!: string;

  @Column({ select: false })
  @ApiHideProperty()
  salt!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  lastOnline?: Date;

  @Column({ nullable: true })
  rememberMe?: boolean;

  @Column({ default: false })
  admin!: boolean;

  @OneToOne(() => PlayerEntity, player => player.user)
  player!: PlayerEntity;

  @OneToMany(() => AuthConfirmationEntity, authConfirmation => authConfirmation.user)
  authConfirmations!: AuthConfirmationEntity[];

  token?: string;

  async validatePassword(password: string): Promise<boolean> {
    return (await hash(password, this.salt)) === this.password;
  }

  removePasswordAndSalt(): this {
    if ('password' in this) {
      this.password = '';
    }
    if ('salt' in this) {
      this.salt = '';
    }
    return this;
  }
}
