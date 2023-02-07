import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VerifyIfCpfRegisteredService } from './services/verify-if-registered.service';
import { CpfValidationPipe } from '~/shared/pipes/cpf-validation.pipe';
import { GetAllCpfService } from './services/get-all.service';
import { CpfResponse } from './@types/cpf-response.type';

@Controller('cpf')
export class CpfController {
  constructor(
    private verifyIfCpfRegisteredService: VerifyIfCpfRegisteredService,
    private getAllCpfService: GetAllCpfService,
  ) {}

  @Get()
  async getAll(): Promise<CpfResponse[]> {
    return await this.getAllCpfService.get();
  }

  @Get(':cpf')
  async verifyIfRegistered(
    @Param('cpf', CpfValidationPipe) cpf: string,
  ): Promise<CpfResponse> {
    return await this.verifyIfCpfRegisteredService.verify(cpf);
  }
}
