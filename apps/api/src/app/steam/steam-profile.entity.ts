import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { PlayerEntity } from '../player/player.entity';
import { SteamProfile } from '@biomercs/api-interfaces';

@Entity()
export class SteamProfileEntity extends BaseEntity implements SteamProfile {
  @Column({ unique: true })
  steamid!: string;

  @Column()
  communityvisibilitystate!: number;

  @Column()
  profilestate!: number;

  @Column()
  personaname!: string;

  @Column()
  profileurl!: string;

  @Column()
  avatar!: string;

  @Column()
  avatarmedium!: string;

  @Column()
  avatarfull!: string;

  @Column()
  avatarhash!: string;

  @Column()
  lastlogoff!: number;

  @Column()
  personastate!: number;

  @Column({ nullable: true })
  realname?: string;

  @Column({ nullable: true })
  primaryclanid?: string;

  @Column({ nullable: true })
  timecreated?: number;

  @Column()
  personastateflags!: number;

  @Column({ nullable: true })
  gameextrainfo?: string;

  @Column({ nullable: true })
  loccountrycode?: string;

  @Column({ nullable: true })
  gameid?: string;

  @OneToOne(() => PlayerEntity, player => player.steamProfile)
  player!: PlayerEntity;
}
