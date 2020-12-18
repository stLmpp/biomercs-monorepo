import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { Platform } from '@biomercs/api-interfaces';

@Entity()
export class PlatformEntity extends BaseEntity implements Platform {
  @Column() name!: string;
  @Column({ length: 10 }) shortName!: string;
}
