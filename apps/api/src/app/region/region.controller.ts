import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../auth/api-auth.decorator';
import { RegionService } from './region.service';
import { Region } from './region.entity';

@ApiAuth()
@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get()
  async findAll(): Promise<Region[]> {
    return this.regionService.findAll();
  }
}
