import { Injectable } from '@nestjs/common';
import { cpf } from '@prisma/client';
import { PrismaService } from '~/shared/infra/prisma/prisma.service';

@Injectable()
export class CpfRepository {
  constructor(private prismaService: PrismaService) {}

  async get(cpf: string): Promise<Pick<cpf, 'cpf' | 'createdAt'>> {
    return await this.prismaService.cpf.findFirst({
      where: { cpf, deletedAt: null },
      select: { cpf: true, createdAt: true },
    });
  }

  async getAll(): Promise<Pick<cpf, 'cpf' | 'createdAt'>[]> {
    return await this.prismaService.cpf.findMany({
      where: { deletedAt: null },
    });
  }

  async create(cpf: string): Promise<Pick<cpf, 'cpf' | 'createdAt'>> {
    return await this.prismaService.cpf.create({
      data: { cpf },
      select: { cpf: true, createdAt: true },
    });
  }

  async delete(cpf: string): Promise<Pick<cpf, 'cpf' | 'createdAt'>> {
    return await this.prismaService.cpf.update({
      where: { cpf_deletedAt: { cpf, deletedAt: null } },
      data: { deletedAt: new Date() },
      select: { cpf: true, createdAt: true },
    });
  }
}
