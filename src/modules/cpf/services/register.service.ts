import { Injectable } from '@nestjs/common';
import { CpfRepository } from '../../../repository/cpf.repository';
import { CpfOnlyResponse } from '../@types/cpf-response.type';

@Injectable()
export class RegisterCpfService {
  constructor(private cpfRepository: CpfRepository) {}

  async register(cpf: string): Promise<CpfOnlyResponse> {
    return await this.cpfRepository.create(cpf);
  }
}
