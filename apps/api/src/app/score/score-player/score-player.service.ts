import { Injectable } from '@nestjs/common';
import { ScorePlayer } from './score-player.entity';
import { ScorePlayerAddDto } from './score-player.dto';
import { ScorePlayerRepository } from './score-player.repository';
import { PlatformGameMiniGameModeCharacterCostumeService } from '../../platform/platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.service';

@Injectable()
export class ScorePlayerService {
  constructor(
    private scorePlayerRepository: ScorePlayerRepository,
    private platformGameMiniGameModeCharacterCostumeService: PlatformGameMiniGameModeCharacterCostumeService
  ) {}

  async addMany(
    idScore: number,
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number,
    dto: ScorePlayerAddDto[]
  ): Promise<ScorePlayer[]> {
    const scorePlayersDto = await Promise.all(
      dto.map(async ({ idCharacterCostume, ...scorePlayer }) => {
        const idPlatformGameMiniGameModeCharacterCostume = await this.platformGameMiniGameModeCharacterCostumeService.findIdByPlaformGameMiniGameModeCharacterCostume(
          idPlatform,
          idGame,
          idMiniGame,
          idMode,
          idCharacterCostume
        );
        return new ScorePlayer().extendDto({ ...scorePlayer, idScore, idPlatformGameMiniGameModeCharacterCostume });
      })
    );
    return this.scorePlayerRepository.save(scorePlayersDto);
  }

  async addManyRandom(scorePlayers: ScorePlayer[]): Promise<ScorePlayer[]> {
    return this.scorePlayerRepository.save(scorePlayers);
  }
}
