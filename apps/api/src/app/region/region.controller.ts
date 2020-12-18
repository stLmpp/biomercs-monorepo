import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../auth/api-auth.decorator';
import { RegionService } from './region.service';
import { RegionEntity } from './region.entity';

@ApiAuth()
@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get()
  async findAll(): Promise<RegionEntity[]> {
    return this.regionService.findAll();
  }
}
