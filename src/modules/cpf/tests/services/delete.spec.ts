import { TestingModule, Test } from '@nestjs/testing';
import { DeleteCpfService, RegisterCpfService } from '~/modules/cpf/services';
import { CpfRepository } from '~/repository/cpf.repository';
import { ExistsCpfException } from '~/errors/exists-cpf.exception';
import { NotFoundCpfException } from '~/errors/not-found-cpf.exception';

const mockCpf: string = '88195561039';

const mockCpfRepositoryGet: CpfRepository.Get = {
  id: '1',
  cpf: mockCpf,
  createdAt: new Date(),
};

const mockCpfRepositoryDelete: CpfRepository.Delete = undefined;

describe('deleteCpfService', () => {
  let deleteCpfService: DeleteCpfService;
  let cpfRepository: CpfRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCpfService,
        {
          provide: CpfRepository,
          useValue: {
            get: jest.fn().mockResolvedValue(mockCpfRepositoryGet),
            delete: jest.fn().mockResolvedValue(mockCpfRepositoryDelete),
          },
        },
      ],
    }).compile();

    deleteCpfService = module.get<DeleteCpfService>(DeleteCpfService);

    cpfRepository = module.get<CpfRepository>(CpfRepository);
  });

  it('should be defined', () => {
    expect(deleteCpfService).toBeDefined();
    expect(cpfRepository).toBeDefined();
  });

  describe('register', () => {
    it('should delete and return the void', async () => {
      const result = await deleteCpfService.delete(mockCpf);

      expect(result).toEqual(mockCpfRepositoryDelete);

      expect(cpfRepository.get).toHaveBeenCalledTimes(1);

      expect(cpfRepository.get).toHaveBeenCalledWith(mockCpf);
    });

    it('should throw an exception', async () => {
      jest.spyOn(deleteCpfService, 'delete').mockRejectedValueOnce(new Error());

      await expect(deleteCpfService.delete(mockCpf)).rejects.toThrowError(
        new Error(),
      );
    });

    it('should throw NotFoundCpf exception', async () => {
      jest.spyOn(cpfRepository, 'get').mockResolvedValueOnce(null);

      const result = deleteCpfService.delete(mockCpf);

      await expect(result).rejects.toThrow(NotFoundCpfException);
    });
  });
});
