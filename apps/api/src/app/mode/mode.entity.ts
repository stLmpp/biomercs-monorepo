import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { PlatformGameMiniGameModeEntity } from '../platform/platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { Mode } from '@biomercs/api-interfaces';

@Entity()
export class ModeEntity extends BaseEntity implements Mode {
  @Column() name!: string;
  @Column() playerQuantity!: number;

  @OneToMany(() => PlatformGameMiniGameModeEntity, platformGameMiniGameMode => platformGameMiniGameMode.mode)
  platformGameMiniGameModes!: PlatformGameMiniGameModeEntity[];
}
