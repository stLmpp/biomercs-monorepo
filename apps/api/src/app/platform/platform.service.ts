import { Injectable } from '@nestjs/common';
import { PlatformRepository } from './platform.repository';
import { PlatformEntity } from './platform.entity';
import { PlatformAddDto, PlatformUpdateDto } from './platform.dto';

@Injectable()
export class PlatformService {
  constructor(private platformRepository: PlatformRepository) {}

  async findById(idPlatform: number): Promise<PlatformEntity> {
    return this.platformRepository.findOneOrFail(idPlatform);
  }

  async findAll(): Promise<PlatformEntity[]> {
    return this.platformRepository.find();
  }

  async add(dto: PlatformAddDto): Promise<PlatformEntity> {
    return this.platformRepository.save(new PlatformEntity().extendDto(dto));
  }

  async update(idPlatform: number, dto: PlatformUpdateDto): Promise<PlatformEntity> {
    await this.platformRepository.update(idPlatform, dto);
    return this.platformRepository.findOneOrFail(idPlatform);
  }
}
