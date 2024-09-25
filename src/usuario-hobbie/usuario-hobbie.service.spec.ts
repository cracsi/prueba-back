import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioHobbieService } from './usuario-hobbie.service';

describe('UsuarioHobbieService', () => {
  let service: UsuarioHobbieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioHobbieService],
    }).compile();

    service = module.get<UsuarioHobbieService>(UsuarioHobbieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
