import { Test, TestingModule } from '@nestjs/testing';
import { CpfController } from '../cpf.controller';
import {
  VerifyIfCpfRegisteredService,
  GetAllCpfService,
  DeleteCpfService,
  RegisterCpfService,
} from '../services';
import { CpfResponse } from '../@types/cpf-response.type';

const mockCpf: CpfResponse = { cpf: '88195561039', createdAt: new Date() };

describe('CpfController', () => {
  let cpfController: CpfController;
  let verifyIfCpfRegisteredService: VerifyIfCpfRegisteredService;
  let getAllCpfService: GetAllCpfService;
  let registerCpfService: RegisterCpfService;
  let deleteCpfService: DeleteCpfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpfController],
      providers: [
        {
          provide: GetAllCpfService,
          useValue: { get: jest.fn().mockResolvedValue([mockCpf]) },
        },
        {
          provide: VerifyIfCpfRegisteredService,
          useValue: { verify: jest.fn().mockResolvedValue(mockCpf) },
        },
        {
          provide: RegisterCpfService,
          useValue: {
            register: jest.fn().mockResolvedValue({ cpf: mockCpf.cpf }),
          },
        },
        {
          provide: DeleteCpfService,
          useValue: { delete: jest.fn().mockResolvedValue(undefined) },
        },
      ],
    }).compile();

    cpfController = module.get<CpfController>(CpfController);
    verifyIfCpfRegisteredService = module.get<VerifyIfCpfRegisteredService>(
      VerifyIfCpfRegisteredService,
    );
    getAllCpfService = module.get<GetAllCpfService>(GetAllCpfService);
    registerCpfService = module.get<RegisterCpfService>(RegisterCpfService);
    deleteCpfService = module.get<DeleteCpfService>(DeleteCpfService);
  });

  it('should be defined', () => {
    expect(cpfController).toBeDefined();
    expect(verifyIfCpfRegisteredService).toBeDefined();
    expect(getAllCpfService).toBeDefined();
    expect(registerCpfService).toBeDefined();
    expect(deleteCpfService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of cpf and createdAt successfully', async () => {
      const result = await cpfController.getAll();

      expect(result).toEqual([mockCpf]);

      expect(getAllCpfService.get).toHaveBeenCalledTimes(1);

      expect(getAllCpfService.get).toHaveBeenCalledWith();
    });

    it('should return a empty list', async () => {
      jest.spyOn(getAllCpfService, 'get').mockResolvedValueOnce([]);

      await expect(cpfController.getAll()).resolves.toEqual([]);

      expect(getAllCpfService.get).toHaveBeenCalledTimes(1);

      expect(getAllCpfService.get).toHaveBeenCalledWith();
    });

    it('should throw an exception', async () => {
      jest.spyOn(getAllCpfService, 'get').mockRejectedValueOnce(new Error());

      await expect(cpfController.getAll()).rejects.toThrowError();

      expect(getAllCpfService.get).toHaveBeenCalledTimes(1);

      expect(getAllCpfService.get).toHaveBeenCalledWith();
    });
  });

  describe('verifyIfRegistered', () => {
    it('should return cpf and createdAt', async () => {
      const result = await cpfController.verifyIfRegistered(mockCpf.cpf);

      expect(result).toEqual(mockCpf);

      expect(verifyIfCpfRegisteredService.verify).toHaveBeenCalledWith(
        mockCpf.cpf,
      );

      expect(verifyIfCpfRegisteredService.verify).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(verifyIfCpfRegisteredService, 'verify')
        .mockRejectedValueOnce(new Error());

      await expect(
        cpfController.verifyIfRegistered(mockCpf.cpf),
      ).rejects.toThrowError(new Error());

      expect(verifyIfCpfRegisteredService.verify).toHaveBeenCalledTimes(1);
      expect(verifyIfCpfRegisteredService.verify).toHaveBeenCalledWith(
        mockCpf.cpf,
      );
    });
  });

  describe('register', () => {
    it('should create a new cpf successfully', async () => {
      const result = await cpfController.register(mockCpf.cpf);

      expect(result).toEqual({ cpf: mockCpf.cpf });

      expect(registerCpfService.register).toHaveBeenCalledTimes(1);

      expect(registerCpfService.register).toHaveBeenCalledWith(mockCpf.cpf);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(registerCpfService, 'register')
        .mockRejectedValueOnce(new Error());

      await expect(cpfController.register(mockCpf.cpf)).rejects.toThrowError();

      expect(registerCpfService.register).toHaveBeenCalledTimes(1);

      expect(registerCpfService.register).toHaveBeenCalledWith(mockCpf.cpf);
    });
  });

  describe('delete', () => {
    it('should delete a cpf successfully', async () => {
      const result = await cpfController.delete(mockCpf.cpf);

      expect(result).toEqual(undefined);

      expect(deleteCpfService.delete).toHaveBeenCalledTimes(1);

      expect(deleteCpfService.delete).toHaveBeenCalledWith(mockCpf.cpf);
    });

    it('should throw an exception', async () => {
      jest.spyOn(deleteCpfService, 'delete').mockRejectedValueOnce(new Error());

      await expect(cpfController.delete(mockCpf.cpf)).rejects.toThrowError();

      expect(deleteCpfService.delete).toHaveBeenCalledTimes(1);

      expect(deleteCpfService.delete).toHaveBeenCalledWith(mockCpf.cpf);
    });
  });
});
