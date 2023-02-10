import { Test } from '@nestjs/testing';
import { CpfModule } from '../cpf.module';
import { CpfController } from '../cpf.controller';

describe('CpfModule', () => {
  let cpfController: CpfController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CpfModule],
    }).compile();

    cpfController = module.get<CpfController>(CpfController);
  });

  it('should to be defined', () => {
    expect(cpfController.verifyIfRegistered).toBeDefined();
    expect(cpfController.getAll).toBeDefined();
    expect(cpfController.register).toBeDefined();
    expect(cpfController.delete).toBeDefined();
  });
});
