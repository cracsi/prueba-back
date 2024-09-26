import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HobbieModule } from './hobbie/hobbie.module';
import { UsuarioModule } from './usuario/usuario.module';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { HobbieEntity } from './hobbie/hobbie.etntity';
import { UsuarioHobbieModule } from './usuario-hobbie/usuario-hobbie.module';
import { dataSourceOptions } from '../migrations/sourceOptions';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    HobbieModule, 
    UsuarioModule, 
    UsuarioHobbieModule],
  controllers: [AppController, ],
  providers: [AppService,],
})
export class AppModule {}
