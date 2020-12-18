import { Injectable } from '@nestjs/common';
import { ModeRepository } from './mode.repository';
import { ModeEntity } from './mode.entity';
import { ModeAddDto, ModeUpdateDto } from './mode.dto';

@Injectable()
export class ModeService {
  constructor(private modeRepository: ModeRepository) {}

  async findById(idMode: number): Promise<ModeEntity> {
    return this.modeRepository.findOneOrFail(idMode);
  }

  async add(dto: ModeAddDto): Promise<ModeEntity> {
    return this.modeRepository.save(new ModeEntity().extendDto(dto));
  }

  async update(idMode: number, dto: ModeUpdateDto): Promise<ModeEntity> {
    await this.modeRepository.update(idMode, dto);
    return this.modeRepository.findOneOrFail(idMode);
  }

  async findByIdPlatformGameMiniGame(idPlatform: number, idGame: number, idMiniGame: number): Promise<ModeEntity[]> {
    return this.modeRepository.findByIdPlatformGameMiniGame(idPlatform, idGame, idMiniGame);
  }
}
