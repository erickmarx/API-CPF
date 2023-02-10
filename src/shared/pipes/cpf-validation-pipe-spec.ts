import { CpfTransformPipe } from './cpf-validation.pipe';
import { InvalidCpfException } from '~/errors/invalid-cpf.exception';

const mockSuccessCpf = '88195561039';
const mockInvalidCpf = '12345678945';
const mockInvalidLengthCpf = '123456789';

describe('CpfTransformPipe', () => {
  let pipe: CpfTransformPipe;

  beforeAll(() => {
    pipe = new CpfTransformPipe();
  });

  it('should be validate cpf successfully', () => {
    const result = pipe.transform(mockSuccessCpf);

    expect(result).toEqual(mockSuccessCpf);
  });

  it('should be validate if cpf is null', () => {
    const result = () => pipe.transform('');

    expect(result).toThrow(InvalidCpfException);
  });

  it('should be validate cpf unsuccessfully', () => {
    const result = () => pipe.transform(mockInvalidCpf);

    expect(result).toThrowError(InvalidCpfException);
  });

  it('should be validate cpf length unsuccessfully', () => {
    const result = () => pipe.transform(mockInvalidLengthCpf);

    expect(result).toThrowError(InvalidCpfException);
  });
});
