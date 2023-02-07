import { Controller, Get, Param } from '@nestjs/common';
import { VerifyIfCpfRegistered } from './services/verify-if-registered.service';
import { CpfValidationPipe } from '~/shared/pipes/cpf-validation.pipe';

@Controller()
export class CpfController {
  constructor(private verifyIfCpfRegistered: VerifyIfCpfRegistered) {}

  @Get('verify/:cpf')
  async verifyIfRegistered(@Param('cpf', CpfValidationPipe) cpf: string) {
    return await this.verifyIfCpfRegistered.verify(cpf);
  }
}
