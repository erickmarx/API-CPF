import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infra/prisma/prisma.module';
import { RepositoryModule } from './repository/repository.module';
import { CpfModule } from './modules/cpf/cpf.module';

@Module({
  imports: [PrismaModule, RepositoryModule, CpfModule],
})
export class AppModule {}
