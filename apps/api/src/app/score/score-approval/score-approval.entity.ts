import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { ScoreEntity } from '../score.entity';
import { PlayerEntity } from '../../player/player.entity';
import { UserEntity } from '../../user/user.entity';
import { ScoreApprovalActionEnum } from './score-approval-action.enum';
import { ScoreApprovalMotiveEntity } from '../score-approval-motive/score-approval-motive.entity';

@Entity()
export class ScoreApprovalEntity extends BaseEntity {
  @Column()
  idScore!: number;

  @ManyToOne(() => ScoreEntity)
  @JoinColumn()
  score!: ScoreEntity;

  @Column()
  actionDate!: Date;

  @Column({ nullable: true })
  actionByPlayer?: number;

  @ManyToOne(() => PlayerEntity, { nullable: true })
  @JoinColumn({ name: 'actionByPlayer', referencedColumnName: 'id' })
  player?: PlayerEntity;

  @Column({ nullable: true })
  actionByAdmin?: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'actionByAdmin', referencedColumnName: 'id' })
  admin?: UserEntity;

  @Column()
  @Column({ nullable: true, length: 1000 })
  description?: string;

  @Column({ type: 'enum', enum: ScoreApprovalActionEnum })
  action!: ScoreApprovalActionEnum;

  @Column()
  idScoreApprovalMotive!: number;

  @ManyToOne(() => ScoreApprovalMotiveEntity)
  @JoinColumn()
  scoreApprovalMotive!: ScoreApprovalMotiveEntity;
}
