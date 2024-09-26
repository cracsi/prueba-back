import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity} from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    controllers: [UsuarioController],
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    providers:[UsuarioService]
})
export class UsuarioModule {}
