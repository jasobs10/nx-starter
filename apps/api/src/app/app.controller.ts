import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App Example')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get hello world
   */
  @Get()
  getData() {
    return this.appService.getData();
  }
}
