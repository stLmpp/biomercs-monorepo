import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { PlatformGameMiniGameModeEntity } from '../platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { CharacterCostumeEntity } from '../../character/character-costume/character-costume.entity';

@Unique(['idPlatformGameMiniGameMode', 'idCharacterCostume'])
@Entity()
export class PlatformGameMiniGameModeCharacterCostumeEntity extends BaseEntity {
  @Column()
  idPlatformGameMiniGameMode!: number;

  @ManyToOne(() => PlatformGameMiniGameModeEntity)
  @JoinColumn()
  platformGameMiniGameMode!: PlatformGameMiniGameModeEntity;

  @Column()
  idCharacterCostume!: number;

  @ManyToOne(() => CharacterCostumeEntity)
  @JoinColumn()
  characterCostume!: CharacterCostumeEntity;
}
