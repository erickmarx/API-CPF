import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CpfResponse, CpfOnlyResponse } from './@types/cpf-response.type';
import { CpfTransformPipe } from '../../shared/pipes/cpf-validation.pipe';
import {
  VerifyIfCpfRegisteredService,
  GetAllCpfService,
  RegisterCpfService,
  DeleteCpfService,
} from './services';

@Controller('cpf')
export class CpfController {
  constructor(
    private verifyIfCpfRegisteredService: VerifyIfCpfRegisteredService,
    private getAllCpfService: GetAllCpfService,
    private registerCpfService: RegisterCpfService,
    private deleteCpfService: DeleteCpfService,
  ) {}

  //Get para pegar todos os CPFs
  @Get()
  async getAll(): Promise<CpfResponse[]> {
    return await this.getAllCpfService.get();
  }

  //Get para verificar se o CPF já está registrado
  @Get(':cpf')
  async verifyIfRegistered(
    @Param('cpf', CpfTransformPipe) cpf: string,
  ): Promise<CpfResponse> {
    return await this.verifyIfCpfRegisteredService.verify(cpf);
  }

  //Post para registrar o CPF
  @Post()
  async register(
    @Body('cpf', CpfTransformPipe) cpf: string,
  ): Promise<CpfOnlyResponse> {
    return await this.registerCpfService.register(cpf);
  }

  //Delete para deletar o CPF
  @Delete(':cpf')
  async delete(@Param('cpf', CpfTransformPipe) cpf: string): Promise<void> {
    await this.deleteCpfService.delete(cpf);
  }
}
