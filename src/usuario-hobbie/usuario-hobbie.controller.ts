import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/business-error.interceptor';
import { UsuarioHobbieService } from './usuario-hobbie.service';
import { HobbieDto } from 'src/hobbie/hobbie.dto';
import { UsuarioDto } from 'src/usuario/usuario.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { HobbieEntity } from 'src/hobbie/hobbie.etntity';



@Controller('usuario-hobbie')
export class UsuarioHobbieController {

    
    constructor(private readonly usuarioHobbieService: UsuarioHobbieService){}

    @Post(':usuarioId/:hobbieId')
    async addUsuarioHobbie(@Param('usuarioId') usuarioId: string, @Param ('hobbieId') hobbieId: string){
        
        
        return await this.usuarioHobbieService.addHobbie(usuarioId, hobbieId);
    }

    
    
    
    @Delete(':usuarioId/:hobbieId')
    @HttpCode(204)
    async deleteUsuarioHobbie(@Param('usuarioId') usuarioId: string, @Param('hobbieId') hobbieId: string){
        
        return await this.usuarioHobbieService.deleteHobbie(usuarioId, hobbieId);
    }
}
