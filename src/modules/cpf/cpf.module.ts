import { Module } from '@nestjs/common';
import { CpfController } from './cpf.controller';
import { RepositoryModule } from '~/repository/repository.module';
import { VerifyIfCpfRegistered } from './services/verify-if-registered.service';

@Module({
  imports: [RepositoryModule],
  controllers: [CpfController],
  providers: [VerifyIfCpfRegistered],
})
export class CpfModule {}
