import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { CharacterCostumeEntity } from './character-costume/character-costume.entity';
import { Character } from '@biomercs/api-interfaces';

@Entity()
export class CharacterEntity extends BaseEntity implements Character {
  @Column() name!: string;

  @OneToMany(() => CharacterCostumeEntity, characterCostume => characterCostume.character)
  characterCostumes!: CharacterCostumeEntity[];
}
