import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserAddDto, UserGetDto, UserUpdateDto } from './user.dto';
import { UserEntity } from './user.entity';
import { FindConditions } from 'typeorm';
import { AuthCredentialsDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async add(dto: UserAddDto): Promise<UserEntity> {
    return this.userRepository.save(new UserEntity().extendDto(dto));
  }

  async update(idUser: number, dto: UserUpdateDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(idUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(idUser, dto);
    return new UserEntity().extendDto({ ...user, ...dto });
  }

  async updatePassword(idUser: number, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(idUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(idUser, { password });
    return user;
  }

  async getById(idUser: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(idUser);
  }

  async get(dto: UserGetDto, one: true): Promise<UserEntity | undefined>;
  async get(dto: UserGetDto): Promise<UserEntity[]>;
  async get(dto: UserGetDto, one?: true): Promise<UserEntity[] | UserEntity | undefined> {
    return this.userRepository.get(dto, one);
  }

  async getByEmailOrUsername(username?: string, email?: string): Promise<UserEntity | undefined> {
    if (!username && !email) {
      throw new BadRequestException('Needs at least one parameter');
    }
    const where: FindConditions<UserEntity>[] = [];
    if (username) {
      where.push({ username });
    }
    if (email) {
      where.push({ email });
    }
    return this.userRepository.findOne({ where });
  }

  async anyByEmailOrUsername(username?: string, email?: string): Promise<boolean> {
    if (!username && !email) {
      throw new BadRequestException('Needs at least one parameter');
    }
    const where: FindConditions<UserEntity>[] = [];
    if (username) {
      where.push({ username });
    }
    if (email) {
      where.push({ email });
    }
    return this.userRepository.exists(where);
  }

  async validateUserToLogin(dto: AuthCredentialsDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.username }],
    });
    if (!user) {
      throw new UnauthorizedException('User or password invalid');
    }
    const { salt, password } = await this.getPasswordAndSalt(user.id);
    user.salt = salt;
    user.password = password;
    const isPasswordValid = await user.validatePassword(dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('User or password invalid');
    }
    return user;
  }

  async getPasswordAndSalt(idUser: number): Promise<Pick<UserEntity, 'password' | 'salt'>> {
    const user = await this.userRepository.findOne(idUser, { select: ['password', 'salt'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getBySteamid(steamid: string): Promise<UserEntity | undefined> {
    return this.userRepository.getBySteamid(steamid);
  }

  async findByAuthCode(code: number): Promise<UserEntity | undefined> {
    return this.userRepository.findByAuthCode(code);
  }
}
