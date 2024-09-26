import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioHobbieController } from './usuario-hobbie.controller';

describe('UsuarioHobbieController', () => {
  let controller: UsuarioHobbieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioHobbieController],
    }).compile();

    controller = module.get<UsuarioHobbieController>(UsuarioHobbieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
