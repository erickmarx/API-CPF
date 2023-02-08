import { BadRequestException } from '@nestjs/common';

export class ExistsCpfException extends BadRequestException {
  constructor() {
    super('CPF already registered');
  }
}
