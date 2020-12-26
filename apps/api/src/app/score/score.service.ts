import { BadRequestException, Injectable } from '@nestjs/common';
import { ScoreRepository } from './score.repository';
import { ScoreAddDto } from './score.dto';
import { ScoreEntity } from './score.entity';
import { PlatformGameMiniGameModeStageService } from '../platform/platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.service';
import { ModeService } from '../mode/mode.service';
import { ScorePlayerService } from './score-player/score-player.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ScoreViewModel } from './view-model/score.view-model';
import { MapperService } from '../mapper/mapper.service';
import { random } from '../util/util';
import { ScorePlayerEntity } from './score-player/score-player.entity';
import { PlayerService } from '../player/player.service';
import { PlatformGameMiniGameModeCharacterCostumeService } from '../platform/platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.service';
import { ScoreTableViewModel, ScoreTopTableViewModel } from './view-model/score-table.view-model';
import { ScoreStatusEnum } from '@biomercs/api-interfaces';
import { StageEntity } from '../stage/stage.entity';

@Injectable()
export class ScoreService {
  constructor(
    private scoreRepository: ScoreRepository,
    private platformGameMiniGameModeStageService: PlatformGameMiniGameModeStageService,
    private modeService: ModeService,
    private scorePlayerService: ScorePlayerService,
    private mapperService: MapperService,
    private playerService: PlayerService,
    private platformGameMiniGameModeCharacterCostumeService: PlatformGameMiniGameModeCharacterCostumeService
  ) {}

  @Transactional()
  async add({
    idPlatform,
    idGame,
    idMiniGame,
    idMode,
    idStage,
    scorePlayers,
    ...dto
  }: ScoreAddDto): Promise<ScoreViewModel> {
    const mode = await this.modeService.findById(idMode);
    if (mode.playerQuantity !== scorePlayers.length) {
      throw new BadRequestException(
        `This mode requires ${mode.playerQuantity} player(s), but we received ${scorePlayers.length}`
      );
    }
    const idPlatformGameMiniGameModeStage = await this.platformGameMiniGameModeStageService.findIdByPlatformGameMiniGameModeStage(
      idPlatform,
      idGame,
      idMiniGame,
      idMode,
      idStage
    );
    const status =
      mode.playerQuantity > 1 ? ScoreStatusEnum.AwaitingApprovalPlayer : ScoreStatusEnum.AwaitingApprovalAdmin;
    const score = await this.scoreRepository.save(
      new ScoreEntity().extendDto({ ...dto, idPlatformGameMiniGameModeStage, status })
    );
    await this.scorePlayerService.addMany(score.id, idPlatform, idGame, idMiniGame, idMode, scorePlayers);
    return this.findByIdMapped(score.id);
  }

  async findByIdMapped(idScore: number): Promise<ScoreViewModel> {
    return this.mapperService.map(
      ScoreEntity,
      ScoreViewModel,
      await this.scoreRepository.findByIdWithAllRelations(idScore)
    );
  }

  // TODO REMOVE
  async insert(
    options: {
      platform?: string;
      game?: string;
      miniGame?: string;
      mode?: string;
    } = {}
  ): Promise<ScoreEntity> {
    const platformGameMiniGameModeStage = await this.platformGameMiniGameModeStageService.findRandom(options);
    const score = new ScoreEntity();
    score.score = random(700_000, 1_500_000);
    score.dateAchieved = new Date(+new Date() - Math.floor(Math.random() * 10000000000));
    score.status = ScoreStatusEnum.AwaitingApprovalAdmin;
    score.idPlatformGameMiniGameModeStage = platformGameMiniGameModeStage.id;
    score.maxCombo = random(100, 150);
    score.time = `${('' + random(8, 16)).padStart(2, '0')}'${('' + random(0, 59)).padStart(2, '0')}"${(
      '' + random(0, 99)
    ).padStart(2, '0')}`;
    score.lastUpdatedBy = 32;
    score.createdBy = 32;
    const scoreDb = await this.scoreRepository.save(score);
    const scorePlayers: ScorePlayerEntity[] = await Promise.all(
      Array.from({ length: platformGameMiniGameModeStage.platformGameMiniGameMode.mode.playerQuantity }).map(
        async (_, index) => {
          const player = await this.playerService.findRandom();
          const platformGameMiniGameModeCharacterCostume = await this.platformGameMiniGameModeCharacterCostumeService.findRandom(
            platformGameMiniGameModeStage.idPlatformGameMiniGameMode
          );
          const scorePlayer = new ScorePlayerEntity();
          scorePlayer.bulletKills = random(0, 15);
          scorePlayer.description = '';
          scorePlayer.evidence = 'TESTE';
          scorePlayer.idPlayer = player.id;
          scorePlayer.host = !index;
          scorePlayer.idPlatformGameMiniGameModeCharacterCostume = platformGameMiniGameModeCharacterCostume.id;
          scorePlayer.createdBy = 32;
          scorePlayer.lastUpdatedBy = 32;
          scorePlayer.idScore = scoreDb.id;
          return scorePlayer;
        }
      )
    );
    score.scorePlayers = await this.scorePlayerService.addManyRandom(scorePlayers);
    return score;
  }

  async findScoreTable(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number,
    page: number,
    limit: number
  ): Promise<ScoreTopTableViewModel> {
    const platformGameMiniGameModeStages = await this.platformGameMiniGameModeStageService.findByPlatformGameMiniGameMode(
      idPlatform,
      idGame,
      idMiniGame,
      idMode
    );
    const [scoreMap, meta] = await this.scoreRepository.findScoreTable(
      idPlatform,
      idGame,
      idMiniGame,
      idMode,
      page,
      limit
    );
    const scoreTableViewModel: ScoreTableViewModel[] = [];
    let position = (page - 1) * limit + 1;
    for (const [idPlayer, scores] of scoreMap) {
      const player = scores.find(score => score)!.scorePlayers.find(scorePlayer => scorePlayer.idPlayer === idPlayer)!
        .player;
      const scoreTable = new ScoreTableViewModel();
      scoreTable.idPlayer = player.id;
      scoreTable.personaName = player.personaName;
      const scoresMapped = this.mapperService.map(ScoreEntity, ScoreViewModel, scores);
      scoreTable.scores = platformGameMiniGameModeStages.map(platformGameMiniGameModeStage =>
        scoresMapped.find(score => score.idPlatformGameMiniGameModeStage === platformGameMiniGameModeStage.id)
      );
      scoreTable.total = scoreTable.scores.reduce((acc, score) => acc + (score?.score ?? 0), 0);
      scoreTable.position = position++;
      scoreTableViewModel.push(scoreTable);
    }
    return {
      scoreTables: scoreTableViewModel,
      stages: platformGameMiniGameModeStages.reduce((acc, item) => [...acc, item.stage], [] as StageEntity[]),
      meta,
    };
  }
}
