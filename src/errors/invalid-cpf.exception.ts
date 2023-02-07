import { BadRequestException } from '@nestjs/common';

export class InvalidCpfException extends BadRequestException {
  constructor() {
    super('CPF is not valid');
  }
}
