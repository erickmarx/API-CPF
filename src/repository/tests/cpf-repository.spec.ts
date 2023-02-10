import { Test } from '@nestjs/testing';
import { PrismaModule } from '~/shared/infra/prisma/prisma.module';
import { CpfRepository } from '../cpf.repository';

const mockCpf: string = '88195561039';

const mockCpfRepositoryGet: CpfRepository.Get = {
  id: '1',
  cpf: mockCpf,
  createdAt: new Date(),
};

const mockCpfRepositoryGetAll: CpfRepository.GetAll = [
  { cpf: mockCpf, createdAt: new Date() },
];

const mockCpfRepositoryCreate: CpfRepository.Create = { cpf: mockCpf };

const mockCpfRepositoryDelete: CpfRepository.Delete = undefined;

describe('CpfRepository', () => {
  let cpfRepository: CpfRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        {
          provide: CpfRepository,
          useValue: {
            get: jest.fn().mockResolvedValue(mockCpfRepositoryGet),
            getAll: jest.fn().mockResolvedValue(mockCpfRepositoryGetAll),
            create: jest.fn().mockResolvedValue(mockCpfRepositoryCreate),
            delete: jest.fn().mockResolvedValue(mockCpfRepositoryDelete),
          },
        },
      ],
    }).compile();

    cpfRepository = module.get<CpfRepository>(CpfRepository);
  });

  it('should to be defined', () => {
    expect(cpfRepository.get).toBeDefined();
    expect(cpfRepository.getAll).toBeDefined();
    expect(cpfRepository.create).toBeDefined();
    expect(cpfRepository.delete).toBeDefined();
  });

  describe('get', () => {
    it('should return id, cpf and createdAt', async () => {
      const result = await cpfRepository.get(mockCpf);

      expect(result).toEqual(mockCpfRepositoryGet);

      expect(cpfRepository.get).toHaveBeenCalledTimes(1);

      expect(cpfRepository.get).toHaveBeenCalledWith(mockCpf);
    });

    it('should return null', async () => {
      jest.spyOn(cpfRepository, 'get').mockResolvedValue(null);

      const result = await cpfRepository.get(mockCpf);

      expect(result).toEqual(null);
    });

    it('should throw an exception', async () => {
      jest.spyOn(cpfRepository, 'get').mockRejectedValueOnce(new Error());

      await expect(cpfRepository.get(mockCpf)).rejects.toThrowError(
        new Error(),
      );
    });
  });

  describe('getAll', () => {
    it('should return a list of cpf and createdAt', async () => {
      const result = await cpfRepository.getAll();

      expect(result).toEqual(mockCpfRepositoryGetAll);

      expect(cpfRepository.getAll).toHaveBeenCalledTimes(1);

      expect(cpfRepository.getAll).toHaveBeenCalledWith();
    });

    it('should return empty list', async () => {
      jest.spyOn(cpfRepository, 'getAll').mockResolvedValue([]);

      const result = await cpfRepository.getAll();

      expect(result).toEqual([]);

      expect(cpfRepository.getAll).toHaveBeenCalledTimes(1);

      expect(cpfRepository.getAll).toHaveBeenCalledWith();
    });

    it('should throw an exception', async () => {
      jest.spyOn(cpfRepository, 'get').mockRejectedValueOnce(new Error());

      await expect(cpfRepository.get(mockCpf)).rejects.toThrowError(
        new Error(),
      );
    });
  });
  describe('create', () => {
    it('should create and return cpf and createdAt', async () => {
      const result = await cpfRepository.create(mockCpf);

      expect(result).toEqual(mockCpfRepositoryCreate);

      expect(cpfRepository.create).toHaveBeenCalledTimes(1);

      expect(cpfRepository.create).toHaveBeenCalledWith(mockCpf);
    });

    it('should throw an exception', async () => {
      jest.spyOn(cpfRepository, 'get').mockRejectedValueOnce(new Error());

      await expect(cpfRepository.get(mockCpf)).rejects.toThrowError(
        new Error(),
      );
    });
  });
  describe('delete', () => {
    it('should delete a cpf', async () => {
      const result = await cpfRepository.delete(mockCpf);

      expect(result).toEqual(mockCpfRepositoryDelete);

      expect(cpfRepository.delete).toHaveBeenCalledTimes(1);

      expect(cpfRepository.delete).toHaveBeenCalledWith(mockCpf);
    });

    it('should throw an exception', async () => {
      jest.spyOn(cpfRepository, 'get').mockRejectedValueOnce(new Error());

      await expect(cpfRepository.get(mockCpf)).rejects.toThrowError(
        new Error(),
      );
    });
  });
});
