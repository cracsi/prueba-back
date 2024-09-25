import { Test, TestingModule } from '@nestjs/testing';
import { HobbieService } from './hobbie.service';

describe('HobbieService', () => {
  let service: HobbieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HobbieService],
    }).compile();

    service = module.get<HobbieService>(HobbieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
