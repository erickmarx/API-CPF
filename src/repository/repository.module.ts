import { Module } from '@nestjs/common';
import { CPFRepository } from './cpf.repository';
import { PrismaModule } from '../infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CPFRepository],
  exports: [CPFRepository],
})
export class RepositoryModule {}
