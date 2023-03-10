import { TestingModule, Test } from '@nestjs/testing';
import { VerifyIfCpfRegisteredService } from '~/modules/cpf/services';
import { CpfRepository } from '~/repository/cpf.repository';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';
import { CpfResponse } from '~/modules/cpf/@types/cpf-response.type';

const mockCpf: string = '88195561039';
const mockVerifyIfCpfRegistered: CpfResponse = {
  cpf: mockCpf,
  createdAt: new Date(),
};
const mockCpfRepositoryGet: CpfRepository.Get = {
  id: '1',
  ...mockVerifyIfCpfRegistered,
};

describe('verifyIfCpfRegisteredService', () => {
  let verifyIfCpfRegisteredService: VerifyIfCpfRegisteredService;
  let cpfRepository: CpfRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyIfCpfRegisteredService,
        {
          provide: CpfRepository,
          useValue: {
            get: jest.fn().mockResolvedValue(mockCpfRepositoryGet),
          },
        },
      ],
    }).compile();

    verifyIfCpfRegisteredService = module.get<VerifyIfCpfRegisteredService>(
      VerifyIfCpfRegisteredService,
    );

    cpfRepository = module.get<CpfRepository>(CpfRepository);
  });

  it('should be defined', () => {
    expect(verifyIfCpfRegisteredService).toBeDefined();
    expect(cpfRepository).toBeDefined();
  });

  describe('verify', () => {
    it('should return a cpf and createdAt', async () => {
      const result = await verifyIfCpfRegisteredService.verify(mockCpf);

      expect(result).toEqual<CpfResponse>(mockVerifyIfCpfRegistered);

      expect(cpfRepository.get).toHaveBeenCalledTimes(1);

      expect(cpfRepository.get).toHaveBeenCalledWith(mockCpf);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(verifyIfCpfRegisteredService, 'verify')
        .mockRejectedValueOnce(new Error());

      await expect(
        verifyIfCpfRegisteredService.verify(mockCpf),
      ).rejects.toThrowError(new Error());
    });

    it('should throw NotFoundCpf exception', async () => {
      jest.spyOn(cpfRepository, 'get').mockResolvedValueOnce(null);

      const result = verifyIfCpfRegisteredService.verify(mockCpf);

      await expect(result).rejects.toThrow(NotFoundCpfException);
    });
  });
});
