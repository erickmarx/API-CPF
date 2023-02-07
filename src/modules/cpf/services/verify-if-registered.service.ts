import { Injectable } from '@nestjs/common';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';
import { CpfRepository } from '~/repository/cpf.repository';

@Injectable()
export class VerifyIfCpfRegisteredService {
  constructor(
    private cpfRepository: CpfRepository,
  ) {}

  async verify(cpf: string) {
    const verifiedCpf = await this.cpfRepository.get(cpf);

    if (!verifiedCpf) throw new NotFoundCpfException();

    return verifiedCpf;
  }
}
