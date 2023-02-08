import { Injectable } from '@nestjs/common';
import { cpf } from '@prisma/client';
import { PrismaService } from '~/shared/infra/prisma/prisma.service';

@Injectable()
export class CpfRepository {
  constructor(private prismaService: PrismaService) {}

  async get(cpf: string): Promise<CpfRepository.Get> {
    return await this.prismaService.cpf.findFirst({
      where: { cpf, deletedAt: null },
      select: { id: true, cpf: true, createdAt: true },
    });
  }

  async getAll(): Promise<CpfRepository.GetAll> {
    return await this.prismaService.cpf.findMany({
      where: { deletedAt: null },
      select: { cpf: true, createdAt: true },
    });
  }

  async create(cpf: string): Promise<CpfRepository.Create> {
    return await this.prismaService.cpf.create({
      data: { cpf, deletedAt: null },
      select: { cpf: true },
    });
  }

  async delete(id: string): Promise<CpfRepository.Delete> {
    await this.prismaService.cpf.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { cpf: true, createdAt: true },
    });
  }
}

export namespace CpfRepository {
  export type GetAll = Pick<cpf, 'cpf' | 'createdAt'>[];
  export type Get = Omit<cpf, 'deletedAt'>;
  export type Create = Pick<cpf, 'cpf'>;
  export type Delete = void;
}
