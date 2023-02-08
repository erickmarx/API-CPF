import { Injectable } from '@nestjs/common';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';
import { CpfRepository } from '~/repository/cpf.repository';
import { CpfResponse } from '../@types/cpf-response.type';

@Injectable()
export class VerifyIfCpfRegisteredService {
  constructor(private cpfRepository: CpfRepository) {}

  async verify(cpf: string): Promise<CpfResponse> {
    const verifiedCpf = await this.cpfRepository.get(cpf);

    if (!verifiedCpf) throw new NotFoundCpfException();

    return { cpf: verifiedCpf.cpf, createdAt: verifiedCpf.createdAt };
  }
}
