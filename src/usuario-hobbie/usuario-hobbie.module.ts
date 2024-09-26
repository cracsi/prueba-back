import { Module } from '@nestjs/common';
import { UsuarioHobbieController } from './usuario-hobbie.controller';
import { UsuarioHobbieService } from './usuario-hobbie.service';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { HobbieEntity } from 'src/hobbie/hobbie.etntity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
    providers: [UsuarioHobbieService],
    imports: [TypeOrmModule.forFeature([UsuarioEntity, HobbieEntity])],
    controllers: [UsuarioHobbieController]
})
export class UsuarioHobbieModule {}
