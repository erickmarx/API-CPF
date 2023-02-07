import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { InvalidCpfException } from '~/errors/invalid-cpf.exception';

@Injectable()
export class CpfValidationPipe implements PipeTransform {
  transform(cpf: string, metadata: ArgumentMetadata) {
    const removeSpecialCharsCpf = cpf.replace(/[^\d]/g, '');

    const validateCpf = this.validate(removeSpecialCharsCpf);

    if (!validateCpf) throw new InvalidCpfException();
  }

  private validate(cpf: string) {
    const slicedCpf = cpf.slice(0, 9);
    const slicedDigit = cpf.slice(9).split('');

    const firstDigit = this.validateDigit(
      slicedCpf,
      [10, 9, 8, 7, 6, 5, 4, 3, 2],
    );

    if (firstDigit !== +slicedDigit[0]) return;

    const slicedCpfWithFirstDigit = slicedCpf + firstDigit;

    const secondDigit = this.validateDigit(
      slicedCpf + firstDigit,
      [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
    );

    if (cpf !== slicedCpfWithFirstDigit + secondDigit) return;

    return true;
  }

  private validateDigit(slicedCpf: string, multiplier: number[]) {
    const arrayCpf = slicedCpf.split('');

    let sum = 0;

    for (let index = 0; index < arrayCpf.length; index++) {
      sum += +arrayCpf[index] * multiplier[index];
    }

    const calculatedDigit = (sum * 10) % 11;

    if (calculatedDigit === 10 || calculatedDigit === 11) return 0;

    return calculatedDigit;
  }
}
