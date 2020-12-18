import { EntityRepository, Repository } from 'typeorm';
import { SteamProfileEntity } from './steam-profile.entity';

@EntityRepository(SteamProfileEntity)
export class SteamProfileRepository extends Repository<SteamProfileEntity> {
  findWithPlayerBySteamid(steamid: string): Promise<SteamProfileEntity | undefined> {
    return this.createQueryBuilder('s')
      .leftJoinAndSelect('s.player', 'p')
      .andWhere('s.steamid = :steamid', { steamid })
      .getOne();
  }
}
