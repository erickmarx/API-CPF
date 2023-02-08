import { CpfRepository } from '~/repository/cpf.repository';
import { Injectable } from '@nestjs/common';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';

@Injectable()
export class DeleteCpfService {
  constructor(private cpfRepository: CpfRepository) {}

  async delete(cpf: string): Promise<void> {
    const verifiedCpf = await this.cpfRepository.get(cpf);

    if (!verifiedCpf) throw new NotFoundCpfException();

    await this.cpfRepository.delete(verifiedCpf.id);
  }
}
