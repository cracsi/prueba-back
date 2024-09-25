/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HobbieEntity } from './hobbie.etntity';
import { BusinessLogicException, BusinessError } from '../shared/business-errors';

@Injectable()
export class HobbieService {
    constructor(
        @InjectRepository(HobbieEntity)
        private readonly hobbieRepository: Repository<HobbieEntity>
    ){}

    async findAll(): Promise<HobbieEntity[]> {
        return await this.hobbieRepository.find({ relations: ["usuarios"] });
    }

    async findOne(id: string): Promise<HobbieEntity> {
        const hobbie: HobbieEntity = await this.hobbieRepository.findOne({where: {id}, relations: ["usuarios"] } );
        if (!hobbie)
          throw new BusinessLogicException("The hobbie with the given id was not found", BusinessError.NOT_FOUND);
    
        return hobbie;
    }
    
    async create(hobbie: HobbieEntity): Promise<HobbieEntity> {
        return await this.hobbieRepository.save(hobbie);
    }

    async update(id: string, hobbie: HobbieEntity): Promise<HobbieEntity> {
        const persistedHobbie: HobbieEntity = await this.hobbieRepository.findOne({where:{id}});
        if (!persistedHobbie)
          throw new BusinessLogicException("The hobbie with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.hobbieRepository.save({...persistedHobbie, ...hobbie});
    }

    async delete(id: string) {
        const hobbie: HobbieEntity = await this.hobbieRepository.findOne({where:{id}});
        if (!hobbie)
          throw new BusinessLogicException("The hobbie with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.hobbieRepository.remove(hobbie);
    }
}
