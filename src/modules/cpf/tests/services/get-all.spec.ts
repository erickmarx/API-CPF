import { TestingModule, Test } from '@nestjs/testing';
import { GetAllCpfService } from '~/modules/cpf/services';
import { CpfResponse } from '~/modules/cpf/@types/cpf-response.type';
import { CpfRepository } from '~/repository/cpf.repository';

const mockCpf: CpfResponse = { cpf: '88195561039', createdAt: new Date() };
const mockCpfRepositoryGetAll: CpfRepository.GetAll = [
  { ...mockCpf, createdAt: new Date() },
];

describe('GetAllCpfService', () => {
  let getAllCpfService: GetAllCpfService;
  let cpfRepository: CpfRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllCpfService,
        {
          provide: CpfRepository,
          useValue: {
            getAll: jest.fn().mockResolvedValue(mockCpfRepositoryGetAll),
          },
        },
      ],
    }).compile();

    getAllCpfService = module.get<GetAllCpfService>(GetAllCpfService);

    cpfRepository = module.get<CpfRepository>(CpfRepository);
  });

  it('should be defined', () => {
    expect(getAllCpfService).toBeDefined();
    expect(cpfRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return list of cpf, createdAt ', async () => {
      const result = await getAllCpfService.get();

      expect(result).toEqual(mockCpfRepositoryGetAll);

      expect(cpfRepository.getAll).toHaveBeenCalledTimes(1);

      expect(cpfRepository.getAll).toHaveBeenCalledWith();
    });

    it('should return empty list', async () => {
      jest.spyOn(cpfRepository, 'getAll').mockResolvedValue([]);

      await expect(getAllCpfService.get()).resolves.toEqual([]);
    });

    it('should throw an exception', async () => {
      jest.spyOn(getAllCpfService, 'get').mockRejectedValueOnce(new Error());

      await expect(getAllCpfService.get()).rejects.toThrowError(new Error());
    });
  });
});
