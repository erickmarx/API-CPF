import { Injectable } from '@nestjs/common';
import { CpfRepository } from '~/repository/cpf.repository';
import { CpfResponse } from '../@types/cpf-response.type';

@Injectable()
export class GetAllCpfService {
  constructor(private CpfRepository: CpfRepository) {}

  async get(): Promise<CpfResponse[]> {
    return await this.CpfRepository.getAll();
  }
}
