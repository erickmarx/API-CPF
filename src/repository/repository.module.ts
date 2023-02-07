import { Module } from '@nestjs/common';
import { CpfRepository } from './cpf.repository';
import { PrismaModule } from '~/shared/infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CpfRepository],
  exports: [CpfRepository],
})
export class RepositoryModule {}
