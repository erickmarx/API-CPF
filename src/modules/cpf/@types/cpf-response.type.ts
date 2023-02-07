import { cpf } from '@prisma/client';

export type CpfResponse = Pick<cpf, 'cpf' | 'createdAt'>;

export type CpfOnlyResponse = { cpf: string };
