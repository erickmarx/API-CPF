import { Module } from '@nestjs/common';
import { CpfController } from './cpf.controller';
import { RepositoryModule } from '~/repository/repository.module';
import { VerifyIfCpfRegisteredService } from './services/verify-if-registered.service';

@Module({
  imports: [RepositoryModule],
  controllers: [CpfController],
  providers: [VerifyIfCpfRegisteredService],
})
export class CpfModule {}
