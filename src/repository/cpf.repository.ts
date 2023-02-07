import { Injectable } from '@nestjs/common';
import {
  CpfOnlyResponse,
  CpfResponse,
} from '~/modules/cpf/@types/cpf-response.type';
import { PrismaService } from '~/shared/infra/prisma/prisma.service';

@Injectable()
export class CpfRepository {
  constructor(private prismaService: PrismaService) {}

  async get(cpf: string): Promise<CpfResponse> {
    return await this.prismaService.cpf.findFirst({
      where: { cpf, deletedAt: null },
      select: { cpf: true, createdAt: true },
    });
  }

  async getAll(): Promise<CpfResponse[]> {
    return await this.prismaService.cpf.findMany({
      where: { deletedAt: null },
      select: { cpf: true, createdAt: true },
    });
  }

  async create(cpf: string): Promise<CpfOnlyResponse> {
    return await this.prismaService.cpf.create({
      data: { cpf },
      select: { cpf: true },
    });
  }

  async delete(cpf: string): Promise<CpfResponse> {
    return await this.prismaService.cpf.update({
      where: { cpf_deletedAt: { cpf, deletedAt: null } },
      data: { deletedAt: new Date() },
      select: { cpf: true, createdAt: true },
    });
  }
}
