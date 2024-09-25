import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HobbieController } from './hobbie/hobbie.controller';
import { HobbieService } from './hobbie/hobbie.service';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioHobbieService } from './usuario-hobbie/usuario-hobbie.service';
import "reflect-metadata";

@Module({
  imports: [],
  controllers: [AppController, HobbieController],
  providers: [AppService, HobbieService, UsuarioService, UsuarioHobbieService],
})
export class AppModule {}
