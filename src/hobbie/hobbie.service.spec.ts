import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { HobbieEntity } from './hobbie.etntity';
import { HobbieService } from './hobbie.service';
import { faker } from '@faker-js/faker';

describe('HobbieService', () => {
 let service: HobbieService;
 let repository: Repository<HobbieEntity>;
 let hobbiesList: HobbieEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [HobbieService],
   }).compile();

   service = module.get<HobbieService>(HobbieService);
   repository = module.get<Repository<HobbieEntity>>(getRepositoryToken(HobbieEntity));
   await seedDatabase();
 });

 const seedDatabase = async () => {
  repository.clear();
  hobbiesList = [];
  for(let i = 0; i < 5; i++){
      const hobbie: HobbieEntity = await repository.save({
      nombre: faker.lorem.word(), 
      descripcion: faker.lorem.sentence()})
      hobbiesList.push(hobbie);
  }
}
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('findAll should return all hobbies', async () => {
  const hobbies: HobbieEntity[] = await service.findAll();
  expect(hobbies).not.toBeNull();
  expect(hobbies).toHaveLength(hobbiesList.length);
});

it('create should return a new hobbie', async () => {
  const hobbie: HobbieEntity = {
    id: "",
    nombre: faker.lorem.word(), 
      descripcion: faker.lorem.sentence(),
    usuarios: [],
  }

  const newHobbie: HobbieEntity = await service.create(hobbie);
  expect(newHobbie).not.toBeNull();

  const storedHobbie: HobbieEntity = await repository.findOne({where: {id: newHobbie.id}})
  expect(storedHobbie).not.toBeNull();
  expect(storedHobbie.nombre).toEqual(newHobbie.nombre)
  expect(storedHobbie.descripcion).toEqual(newHobbie.descripcion)
});

it('update should modify a hobbie', async () => {
  const hobbie: HobbieEntity = hobbiesList[0];
  hobbie.nombre = "New name";

  const updatedHobbie: HobbieEntity = await service.update(hobbie.id, hobbie);
  expect(updatedHobbie).not.toBeNull();

  const storedHobbie: HobbieEntity = await repository.findOne({ where: { id: hobbie.id } })
  expect(storedHobbie).not.toBeNull();
  expect(storedHobbie.nombre).toEqual(hobbie.nombre)
});

it('delete should remove a hobbie', async () => {
  const hobbie: HobbieEntity = hobbiesList[0];
  await service.delete(hobbie.id);

  const deletedHobbie: HobbieEntity = await repository.findOne({ where: { id: hobbie.id } })
  expect(deletedHobbie).toBeNull();
});


});

