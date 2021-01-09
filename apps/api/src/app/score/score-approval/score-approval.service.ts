import { Injectable } from '@nestjs/common';
import { ScoreApprovalRepository } from './score-approval.repository';
import { ScoreApprovalAddAdminDto, ScoreApprovalAddPlayerDto } from './score-approval.dto';
import { ScoreApprovalEntity } from './score-approval.entity';

@Injectable()
export class ScoreApprovalService {
  constructor(private scoreApprovalRepository: ScoreApprovalRepository) {}

  async addAdmin({ idUser, ...dto }: ScoreApprovalAddAdminDto): Promise<ScoreApprovalEntity> {
    return this.scoreApprovalRepository.save(new ScoreApprovalEntity().extendDto({ ...dto, actionByAdmin: idUser }));
  }

  async addPlayer({ idPlayer, ...dto }: ScoreApprovalAddPlayerDto): Promise<ScoreApprovalEntity> {
    return this.scoreApprovalRepository.save(new ScoreApprovalEntity().extendDto({ ...dto, actionByPlayer: idPlayer }));
  }
}
