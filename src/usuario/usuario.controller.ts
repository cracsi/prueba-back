/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/business-error.interceptor';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';



@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(){
    return await this.usuarioService.findAll();
  }

  @Get(':usuarioId') 
  async findOne(@Param('usuarioId') usuarioId: string){
    return await this.usuarioService.findOne(usuarioId);
  }

  @Post()
  async create(@Body() usuarioDto: UsuarioDto){

    const usuario = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.create(usuario);
  }

  @Put(':usuarioId')
  async update(@Param('usuarioId') usuarioId: string, @Body() usuarioDto: UsuarioDto){

    const usuario = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.update(usuarioId, usuario);
  }

  @Delete(':usuarioId')
  @HttpCode(204)
  async delete(@Param('usuarioId') usuarioId: string){

    return await this.usuarioService.delete(usuarioId);
  }
}
