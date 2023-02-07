import { Injectable } from '@nestjs/common';
import { cpf } from '@prisma/client';
import { PrismaService } from '~/infra/prisma/prisma.service';

@Injectable()
export class CPFRepository {
  constructor(private prismaService: PrismaService) {}

  async get(cpf: string): Promise<cpf> {
    return await this.prismaService.cpf.findFirstOrThrow({
      where: { cpf, deletedAt: null },
    });
  }

  async getAll(): Promise<cpf[]> {
    return await this.prismaService.cpf.findMany({
      where: { deletedAt: null },
    });
  }

  async create(cpf: string): Promise<cpf> {
    return await this.prismaService.cpf.create({ data: { cpf } });
  }

  async delete(cpf: string): Promise<cpf> {
    return await this.prismaService.cpf.update({
      where: { cpf_deletedAt: { cpf, deletedAt: null } },
      data: { deletedAt: new Date() },
    });
  }
}
