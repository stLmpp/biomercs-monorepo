import { EntityRepository, Repository } from 'typeorm';
import { RegionEntity } from './region.entity';

@EntityRepository(RegionEntity)
export class RegionRepository extends Repository<RegionEntity> {}
