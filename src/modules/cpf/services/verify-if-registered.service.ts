import { Injectable } from '@nestjs/common';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';
import { CpfRepository } from '~/repository/cpf.repository';

@Injectable()
export class VerifyIfCpfRegistered {
  constructor(
    private CpfRepository: CpfRepository,
  ) {}

  async verify(cpfInputed: string) {
    const verifiedCpf = await this.CpfRepository.get(cpfInputed);

    if (!verifiedCpf) throw new NotFoundCpfException();

    return verifiedCpf;
  }
}
