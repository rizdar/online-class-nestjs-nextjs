import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoriesService } from './repositories/repositories.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private repo: RepositoriesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async testGetUser() {
    return this.repo.user.findAllUsers();
  }
}
