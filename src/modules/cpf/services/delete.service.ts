import { CpfRepository } from '~/repository/cpf.repository';
import { Injectable } from '@nestjs/common';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';

@Injectable()
//Service para deletar o CPF
export class DeleteCpfService {
  constructor(private cpfRepository: CpfRepository) {}

  async delete(cpf: string): Promise<void> {
    const cpfToVerify = await this.cpfRepository.get(cpf); //pega o cpf

    if (!cpfToVerify) throw new NotFoundCpfException();//verifica se o cpf foi encontrado e dispara exceção

    await this.cpfRepository.delete(cpfToVerify.id); //deleta o registro e não retorna nada
  }
}
