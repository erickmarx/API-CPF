import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/prisma/prisma.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [PrismaModule, RepositoryModule],
})
export class AppModule {}
