import { Injectable } from '@nestjs/common';
import { CpfRepository } from '~/repository/cpf.repository';
import { CpfOnlyResponse } from '../@types/cpf-response.type';
import { ExistsCpfException } from '~/errors/exists-cpf.exception';

@Injectable()
export class RegisterCpfService {
  constructor(private cpfRepository: CpfRepository) {}

  async register(cpf: string): Promise<CpfOnlyResponse> {
    const verifiedCpf = await this.cpfRepository.get(cpf);

    if (verifiedCpf) throw new ExistsCpfException();

    return await this.cpfRepository.create(cpf);
  }
}
