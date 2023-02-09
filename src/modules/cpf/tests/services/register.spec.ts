import { TestingModule, Test } from '@nestjs/testing';
import { RegisterCpfService } from '~/modules/cpf/services';
import { CpfRepository } from '~/repository/cpf.repository';
import { ExistsCpfException } from '~/errors/exists-cpf.exception';

const mockCpf: string = '88195561039';

const mockCpfRepositoryGet: CpfRepository.Get = {
  id: '1',
  cpf: mockCpf,
  createdAt: new Date(),
};
const mockCpfRepositoryRegister: CpfRepository.Create = { cpf: mockCpf };

describe('registerCpfService', () => {
  let registerCpfService: RegisterCpfService;
  let cpfRepository: CpfRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterCpfService,
        {
          provide: CpfRepository,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(mockCpfRepositoryRegister),
          },
        },
      ],
    }).compile();

    registerCpfService = module.get<RegisterCpfService>(RegisterCpfService);

    cpfRepository = module.get<CpfRepository>(CpfRepository);
  });

  it('should be defined', () => {
    expect(registerCpfService).toBeDefined();
    expect(cpfRepository).toBeDefined();
  });

  describe('register', () => {
    it('should register and return the cpf', async () => {
      const result = await registerCpfService.register(mockCpf);

      expect(result).toEqual(mockCpfRepositoryRegister);

      expect(cpfRepository.get).toHaveBeenCalledTimes(1);

      expect(cpfRepository.get).toHaveBeenCalledWith(mockCpf);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(registerCpfService, 'register')
        .mockRejectedValueOnce(new Error());

      await expect(registerCpfService.register(mockCpf)).rejects.toThrowError(
        new Error(),
      );
    });

    it('should throw ExistsCpf exception', async () => {
      jest
        .spyOn(cpfRepository, 'get')
        .mockResolvedValueOnce(mockCpfRepositoryGet);

      const result = registerCpfService.register(mockCpf);

      await expect(result).rejects.toThrow(ExistsCpfException);
    });
  });
});
