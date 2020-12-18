import { Injectable } from '@nestjs/common';
import { StageRepository } from './stage.repository';
import { StageEntity } from './stage.entity';
import { StageAddDto, StageUpdateDto } from './stage.dto';

@Injectable()
export class StageService {
  constructor(private stageRepository: StageRepository) {}

  async findById(idStage: number): Promise<StageEntity> {
    return this.stageRepository.findOneOrFail(idStage);
  }

  async add(dto: StageAddDto): Promise<StageEntity> {
    return this.stageRepository.save(new StageEntity().extendDto(dto));
  }

  async update(idStage: number, dto: StageUpdateDto): Promise<StageEntity> {
    await this.stageRepository.update(idStage, dto);
    return this.stageRepository.findOneOrFail(idStage);
  }

  async findByIdPlatformGameMiniGameMode(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): Promise<StageEntity[]> {
    return this.stageRepository.findByIdPlatformGameMiniGameMode(idPlatform, idGame, idMiniGame, idMode);
  }
}
