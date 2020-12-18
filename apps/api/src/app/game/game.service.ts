import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { GameEntity } from './game.entity';
import { GameAddDto, GameUpdateDto } from './game.dto';

@Injectable()
export class GameService {
  constructor(private gameRepository: GameRepository) {}

  async findById(idGame: number): Promise<GameEntity> {
    return this.gameRepository.findOneOrFail(idGame);
  }

  async add(dto: GameAddDto): Promise<GameEntity> {
    return this.gameRepository.save(new GameEntity().extendDto(dto));
  }

  async update(idGame: number, dto: GameUpdateDto): Promise<GameEntity> {
    await this.gameRepository.update(idGame, dto);
    return this.gameRepository.findOneOrFail(idGame);
  }

  async findByIdPlatform(idPlatform: number): Promise<GameEntity[]> {
    return this.gameRepository.findByIdPlatform(idPlatform);
  }
}
