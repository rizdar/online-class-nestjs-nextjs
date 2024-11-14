import { Global, Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { UserRepository } from './repository/user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [RepositoriesService, UserRepository],
  exports: [RepositoriesService, UserRepository],
})
export class RepositoriesModule {}
