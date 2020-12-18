import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { CharacterEntity } from '../character.entity';
import { PlatformGameMiniGameModeCharacterCostumeEntity } from '../../platform/platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.entity';
import { CharacterCostume } from '@biomercs/api-interfaces';

@Entity()
export class CharacterCostumeEntity extends BaseEntity implements CharacterCostume {
  @Column()
  idCharacter!: number;

  @ManyToOne(() => CharacterEntity)
  @JoinColumn()
  character!: CharacterEntity;

  @Column()
  name!: string;

  @Column({ length: 15 })
  shortName!: string;

  @OneToMany(
    () => PlatformGameMiniGameModeCharacterCostumeEntity,
    platformGameMiniGameModeCharacterCostume => platformGameMiniGameModeCharacterCostume.characterCostume
  )
  platformGameMiniGameModeCharacterCostumes!: PlatformGameMiniGameModeCharacterCostumeEntity[];
}
