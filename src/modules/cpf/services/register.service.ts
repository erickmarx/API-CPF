import { Injectable } from '@nestjs/common';
import { CpfRepository } from '~/repository/cpf.repository';
import { CpfOnlyResponse } from '../@types/cpf-response.type';
import { ExistsCpfException } from '~/errors/exists-cpf.exception';

@Injectable()
//Service para registrar CPF
export class RegisterCpfService {
  constructor(private cpfRepository: CpfRepository) {}

  async register(cpf: string): Promise<CpfOnlyResponse> {
    const verifiedCpf = await this.cpfRepository.get(cpf); //pega o cpf

    if (verifiedCpf) throw new ExistsCpfException(); //verifica se o cpf já está registrado e dispara exceção

    return await this.cpfRepository.create(cpf); //cria o registro de cpf
  }
}
