import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../shared/super/base-entity';
import { SteamProfileEntity } from '../steam/steam-profile.entity';
import { RegionEntity } from '../region/region.entity';
import { Player } from '@biomercs/api-interfaces';

@Entity()
export class PlayerEntity extends BaseEntity implements Player {
  @Column({ unique: true })
  personaName!: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  aboutMe?: string;

  @Column({ nullable: true })
  idUser?: number;

  @OneToOne(() => UserEntity, user => user.player)
  @JoinColumn()
  user?: UserEntity;

  @Column({ nullable: true })
  idSteamProfile?: number;

  @OneToOne(() => SteamProfileEntity, steamProfile => steamProfile.player)
  @JoinColumn()
  steamProfile?: SteamProfileEntity;

  @Column({ default: false })
  noUser!: boolean;

  @Column()
  idRegion!: number;

  @ManyToOne(() => RegionEntity)
  @JoinColumn()
  region!: RegionEntity;
}
