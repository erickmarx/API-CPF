import { Module } from '@nestjs/common';
import { CpfController } from './cpf.controller';
import { RepositoryModule } from '~/repository/repository.module';
import { VerifyIfCpfRegisteredService } from './services/verify-if-registered.service';
import { DeleteCpfService } from './services/delete.service';
import { GetAllCpfService } from './services/get-all.service';
import { RegisterCpfService } from './services/register.service';

@Module({
  imports: [RepositoryModule],
  controllers: [CpfController],
  providers: [
    VerifyIfCpfRegisteredService,
    GetAllCpfService,
    RegisterCpfService,
    DeleteCpfService,
  ],
})
export class CpfModule {}
