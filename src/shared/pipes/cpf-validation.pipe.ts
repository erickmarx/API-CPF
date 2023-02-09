import { PipeTransform, Injectable } from '@nestjs/common';
import { InvalidCpfException } from '~/errors/invalid-cpf.exception';

@Injectable()
export class CpfTransformPipe implements PipeTransform {
  transform(cpf: string) {
    if (!cpf) throw new InvalidCpfException(); //verifica se não há um cpf inserido e retorna uma exceção

    const removeSpecialCharsCpf = cpf.replace(/[^\d]/g, ''); //remove caracteres especiais se houver

    if (cpf.length !== 11) throw new InvalidCpfException(); //verifica se o cpf tem o tamanho correto para a validação

    const validateCpf = this.validate(removeSpecialCharsCpf); //valida a estrutura do cpf

    if (!validateCpf) throw new InvalidCpfException(); //verifica se o cpf é invalido e retorna erro

    return cpf;
  }

  //verifica se o cpf inserido é valido ou não
  private validate(cpf: string) {
    const slicedCpf = cpf.slice(0, 9);
    const slicedDigit = cpf.slice(9).split('');

    const firstDigit = this.validateDigit(
      slicedCpf,
      [10, 9, 8, 7, 6, 5, 4, 3, 2],
    );

    //verifica se o primeiro digito calculado está correto
    if (firstDigit !== +slicedDigit[0]) return;

    const slicedCpfWithFirstDigit = slicedCpf + firstDigit;

    const secondDigit = this.validateDigit(
      slicedCpf + firstDigit,
      [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
    );

    //verifica se o cpf calculado é igual ao cpf inserido
    if (cpf !== slicedCpfWithFirstDigit + secondDigit) return;

    return true;
  }

  //calcula um digito do cpf
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
