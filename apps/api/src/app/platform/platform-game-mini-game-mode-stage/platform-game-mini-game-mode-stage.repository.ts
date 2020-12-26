import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { PlatformGameMiniGameModeStageEntity } from './platform-game-mini-game-mode-stage.entity';

@EntityRepository(PlatformGameMiniGameModeStageEntity)
export class PlatformGameMiniGameModeStageRepository extends Repository<PlatformGameMiniGameModeStageEntity> {
  private _createQueryBuilderRelations(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): SelectQueryBuilder<PlatformGameMiniGameModeStageEntity> {
    return this.createQueryBuilder('pgmms')
      .innerJoinAndSelect('pgmms.stage', 's')
      .innerJoin('pgmms.platformGameMiniGameMode', 'pgmm')
      .innerJoin('pgmm.platformGameMiniGame', 'pgm')
      .innerJoin('pgm.gameMiniGame', 'gm')
      .andWhere('pgm.idPlatform = :idPlatform', { idPlatform })
      .andWhere('gm.idGame = :idGame', { idGame })
      .andWhere('gm.idMiniGame = :idMiniGame', { idMiniGame })
      .andWhere('pgmm.idMode = :idMode', { idMode });
  }
  private _createQueryBuilderRelationsWithStage(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number,
    idStage: number
  ): SelectQueryBuilder<PlatformGameMiniGameModeStageEntity> {
    return this._createQueryBuilderRelations(
      idPlatform,
      idGame,
      idMiniGame,
      idMode
    ).andWhere('pgmms.idStage = :idStage', { idStage });
  }

  async findIdByPlatformGameMiniGameModeStage(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number,
    idStage: number
  ): Promise<number> {
    return (
      await this._createQueryBuilderRelationsWithStage(idPlatform, idGame, idMiniGame, idMode, idStage)
        .select('pgmms.id')
        .getOneOrFail()
    ).id;
  }

  async findByPlatformGameMiniGameModeStage(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number,
    idStage: number
  ): Promise<PlatformGameMiniGameModeStageEntity> {
    return this._createQueryBuilderRelationsWithStage(idPlatform, idGame, idMiniGame, idMode, idStage).getOneOrFail();
  }

  async findByPlatformGameMiniGameMode(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): Promise<PlatformGameMiniGameModeStageEntity[]> {
    return this._createQueryBuilderRelations(idPlatform, idGame, idMiniGame, idMode).getMany();
  }
}
