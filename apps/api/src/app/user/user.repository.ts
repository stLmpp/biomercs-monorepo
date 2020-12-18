import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserGetDto } from './user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async get(dto: UserGetDto, one?: true): Promise<UserEntity[] | UserEntity | undefined> {
    const qb = this.createQueryBuilder('user').fillAndWhere('user', dto);
    if (one) {
      return qb.getOne();
    } else {
      return qb.getMany();
    }
  }

  async getBySteamid(steamid: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('u')
      .innerJoin('u.player', 'p')
      .innerJoin('p.steamProfile', 's')
      .andWhere('s.steamid = :steamid', { steamid })
      .getOne();
  }

  async findByAuthCode(code: number): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('u')
      .innerJoin('u.authConfirmations', 'ac')
      .andWhere('ac.code = :code', { code })
      .getOne();
  }
}
