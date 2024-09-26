/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/business-error.interceptor';
import { HobbieService } from './hobbie.service';
import { HobbieDto } from './hobbie.dto';
import { HobbieEntity } from './hobbie.etntity';


@Controller('hobbies')
@UseInterceptors(BusinessErrorsInterceptor)
export class HobbieController {
    constructor(private readonly hobbieService: HobbieService) {}

  @Get()
  async findAll(){
    return await this.hobbieService.findAll();
  }

  @Get(':hobbieId') 
  async findOne(@Param('hobbieId') hobbieId: string){
    return await this.hobbieService.findOne(hobbieId);
  }

  @Post()
  async create(@Body() hobbieDto: HobbieDto){

    const hobbie = plainToInstance(HobbieEntity, hobbieDto);
    return await this.hobbieService.create(hobbie);
  }

  @Put(':hobbieId')
  async update(@Param('hobbieId') hobbieId: string, @Body() hobbieDto: HobbieDto){

    const hobbie = plainToInstance(HobbieEntity, hobbieDto);
    return await this.hobbieService.update(hobbieId, hobbie);
  }

  @Delete(':hobbieId')
  @HttpCode(204)
  async delete(@Param('hobbieId') hobbieId: string){

    return await this.hobbieService.delete(hobbieId);
  }
}


