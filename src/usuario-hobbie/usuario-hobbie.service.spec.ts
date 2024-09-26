import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioHobbieService } from './usuario-hobbie.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { HobbieEntity } from '../hobbie/hobbie.etntity';
import { faker } from '@faker-js/faker/.';

describe('UsuarioHobbieService', () => {
 let service: UsuarioHobbieService;
 let repositoryUsuario: Repository<UsuarioEntity>;
 let repositoryHobbie: Repository<HobbieEntity>;
 let usuariosList: UsuarioEntity[];
 let hobbiesList: HobbieEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [UsuarioHobbieService],
   }).compile();

   service = module.get<UsuarioHobbieService>(UsuarioHobbieService);
   repositoryUsuario = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
   repositoryHobbie = module.get<Repository<HobbieEntity>>(getRepositoryToken(HobbieEntity));
   await seedDatabase();
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 const seedDatabase = async () => {
  repositoryUsuario.clear();
  usuariosList = [];
  for(let i = 0; i < 5; i++){
      const usuario: UsuarioEntity = await repositoryUsuario.save({
      nombres: faker.lorem.word(), 
      apellidos: faker.lorem.word(), 
      telefono: faker.lorem.word(),
      hobbies: []})
      usuariosList.push(usuario);
  }

  repositoryHobbie.clear();
  hobbiesList = [];
  for(let i = 0; i < 5; i++){
    const hobbie: HobbieEntity = await repositoryHobbie.save({
    nombre: faker.lorem.word(), 
    descripcion: faker.lorem.sentence(),
    usuarios: []})
    hobbiesList.push(hobbie);
}
}

it('addHobbie should add a hobbie to usuario', async () => {
  const usuario: UsuarioEntity = usuariosList[0];
  const hobbie: HobbieEntity = hobbiesList[0];
  
  let [resultU,resultH] = await service.addHobbie(usuario.id, hobbie.id);
  

  expect(resultU.hobbies.length).toBe(1);
  expect(resultU.hobbies[0]).not.toBeNull();
  expect(resultU.hobbies[0].nombre).toBe(hobbie.nombre)
  expect(resultU.hobbies[0].descripcion).toBe(hobbie.descripcion)

  expect(resultH.usuarios.length).toBe(1);
  expect(resultH.usuarios[0]).not.toBeNull();
  expect(resultH.usuarios[0].nombres).toBe(usuario.nombres)
  expect(resultH.usuarios[0].apellidos).toBe(usuario.apellidos)
  expect(resultH.usuarios[0].telefono).toBe(usuario.telefono)

});

it('deleteHobbie should remove las asociaciones', async () => {
  const usuario: UsuarioEntity = usuariosList[0];
  const hobbie: HobbieEntity = hobbiesList[0];
  
  await service.addHobbie(usuario.id, hobbie.id);
  let [resultU,resultH] = await service.deleteHobbie(usuario.id, hobbie.id);

  expect(resultU.hobbies.length).toBe(0);

  expect(resultH.usuarios.length).toBe(0);

});


});
