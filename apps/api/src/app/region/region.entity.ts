import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { Region } from '@biomercs/api-interfaces';

@Entity()
export class RegionEntity extends BaseEntity implements Region {
  @Column()
  name!: string;

  @Column({ length: 10 })
  shortName!: string;
}
