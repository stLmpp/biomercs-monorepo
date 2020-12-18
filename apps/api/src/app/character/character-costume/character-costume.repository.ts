import { EntityRepository, Repository } from 'typeorm';
import { CharacterCostumeEntity } from './character-costume.entity';

@EntityRepository(CharacterCostumeEntity)
export class CharacterCostumeRepository extends Repository<CharacterCostumeEntity> {}
