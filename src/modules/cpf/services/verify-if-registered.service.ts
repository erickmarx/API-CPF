import { Injectable } from '@nestjs/common';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';
import { CpfRepository } from '~/repository/cpf.repository';
import { CpfResponse } from '../@types/cpf-response.type';

@Injectable()
//Service para verificar se o CPF já está registrado
export class VerifyIfCpfRegisteredService {
  constructor(private cpfRepository: CpfRepository) {}

  async verify(cpf: string): Promise<CpfResponse> {
    const cpfToVerify = await this.cpfRepository.get(cpf); //pega o cpf

    if (!cpfToVerify) throw new NotFoundCpfException(); //verifica se o cpf foi encontrado e dispara exceção

    return { cpf: cpfToVerify.cpf, createdAt: cpfToVerify.createdAt }; //retorna cpf e createdAt
  }
}
