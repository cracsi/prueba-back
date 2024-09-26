import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { faker } from '@faker-js/faker';

describe('UsuarioService', () => {
 let service: UsuarioService;
 let repository: Repository<UsuarioEntity>;
 let usuariosList: UsuarioEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [UsuarioService],
   }).compile();

   service = module.get<UsuarioService>(UsuarioService);
   repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
   await seedDatabase();
 });

 const seedDatabase = async () => {
  repository.clear();
  usuariosList = [];
  for(let i = 0; i < 5; i++){
      const usuario: UsuarioEntity = await repository.save({
      nombres: faker.lorem.word(), 
      apellidos: faker.lorem.word(), 
      telefono: faker.lorem.word()})
      usuariosList.push(usuario);
  }
}
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('findAll should return all usuarios', async () => {
  const usuarios: UsuarioEntity[] = await service.findAll();
  expect(usuarios).not.toBeNull();
  expect(usuarios).toHaveLength(usuariosList.length);
});

it('create should return a new usuario', async () => {
  const usuario: UsuarioEntity = {
    id: "",
    nombres: faker.lorem.word(), 
      apellidos: faker.lorem.word(), 
      telefono: faker.lorem.word(),
    hobbies: [],
  }

  const newUsuario: UsuarioEntity = await service.create(usuario);
  expect(newUsuario).not.toBeNull();

  const storedUsuario: UsuarioEntity = await repository.findOne({where: {id: newUsuario.id}})
  expect(storedUsuario).not.toBeNull();
  expect(storedUsuario.nombres).toEqual(newUsuario.nombres)
  expect(storedUsuario.apellidos).toEqual(newUsuario.apellidos)
  expect(storedUsuario.telefono).toEqual(newUsuario.telefono)
});

it('update should modify a usuario', async () => {
  const usuario: UsuarioEntity = usuariosList[0];
  usuario.nombres = "New name";

  const updatedUsuario: UsuarioEntity = await service.update(usuario.id, usuario);
  expect(updatedUsuario).not.toBeNull();

  const storedUsuario: UsuarioEntity = await repository.findOne({ where: { id: usuario.id } })
  expect(storedUsuario).not.toBeNull();
  expect(storedUsuario.nombres).toEqual(usuario.nombres)
});

it('delete should remove a usuario', async () => {
  const usuario: UsuarioEntity = usuariosList[0];
  await service.delete(usuario.id);

  const deletedUsuario: UsuarioEntity = await repository.findOne({ where: { id: usuario.id } })
  expect(deletedUsuario).toBeNull();
});


});

