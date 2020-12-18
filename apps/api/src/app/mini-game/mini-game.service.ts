import { Injectable } from '@nestjs/common';
import { MiniGameRepository } from './mini-game.repository';
import { MiniGameEntity } from './mini-game.entity';
import { MiniGameAddDto, MiniGameUpdateDto } from './mini-game.dto';

@Injectable()
export class MiniGameService {
  constructor(private miniGameRepository: MiniGameRepository) {}

  async findById(idMiniGame: number): Promise<MiniGameEntity> {
    return this.miniGameRepository.findOneOrFail(idMiniGame);
  }

  async add(dto: MiniGameAddDto): Promise<MiniGameEntity> {
    return this.miniGameRepository.save(new MiniGameEntity().extendDto(dto));
  }

  async update(idMiniGame: number, dto: MiniGameUpdateDto): Promise<MiniGameEntity> {
    await this.miniGameRepository.update(idMiniGame, dto);
    return this.miniGameRepository.findOneOrFail(idMiniGame);
  }

  async findByIdPlatformGame(idPlatform: number, idGame: number): Promise<MiniGameEntity[]> {
    return this.miniGameRepository.findByIdPlatformGame(idPlatform, idGame);
  }
}
