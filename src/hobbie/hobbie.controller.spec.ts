import { Test, TestingModule } from '@nestjs/testing';
import { HobbieController } from './hobbie.controller';

describe('HobbieController', () => {
  let controller: HobbieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HobbieController],
    }).compile();

    controller = module.get<HobbieController>(HobbieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
