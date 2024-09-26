
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../../src/usuario/usuario.entity';
import { HobbieEntity } from '../../../src/hobbie/hobbie.etntity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [UsuarioEntity, HobbieEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([UsuarioEntity, HobbieEntity]),
];
