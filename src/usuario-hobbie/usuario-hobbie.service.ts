import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HobbieEntity } from '../hobbie/hobbie.etntity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { BusinessError } from '../shared/business-errors';
import { BusinessLogicException } from '../shared/business-errors';



@Injectable()
export class UsuarioHobbieService {
    
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
     
        @InjectRepository(HobbieEntity)
        private readonly hobbieRepository: Repository<HobbieEntity>
    ) {}

    async addHobbie(usuarioId: string, hobbieId: string):Promise<[UsuarioEntity, HobbieEntity]> {
        const hobbie: HobbieEntity = await this.hobbieRepository.findOne({where: {id: hobbieId}, relations: ["usuarios"]});
        if (!hobbie)
          throw new BusinessLogicException("The hobbie with the given id was not found", BusinessError.NOT_FOUND);
       
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId},  relations: ["hobbies"]}); 
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
        usuario.hobbies = [...usuario.hobbies , hobbie];
        hobbie.usuarios = [...hobbie.usuarios,usuario];
        
        
        return  [await this.usuarioRepository.save(usuario), await this.hobbieRepository.save(hobbie)];
      }
     
     
    async deleteHobbie(usuarioId: string, hobbieId: string):Promise<[UsuarioEntity, HobbieEntity]>{
      
        const hobbie: HobbieEntity = await this.hobbieRepository.findOne({where: {id: hobbieId}, relations: ["usuarios"]});
        if (!hobbie)
          throw new BusinessLogicException("The hobbie with the given id was not found", BusinessError.NOT_FOUND)
     
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId},  relations: ["hobbies"]});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
     
        const hobbiee: HobbieEntity = usuario.hobbies.find(e => e.id === hobbie.id);
        if (!hobbiee)
            throw new BusinessLogicException("The hobbie with the given id is not associated to the usuario", BusinessError.PRECONDITION_FAILED)

        const usuarioo: UsuarioEntity = hobbie.usuarios.find(e => e.id === usuario.id);
        if (!usuarioo)
            throw new BusinessLogicException("The usuario with the given id is not associated to the hobbie", BusinessError.PRECONDITION_FAILED)

        usuario.hobbies = usuario.hobbies.filter(e => e.id !== hobbieId);
        hobbie.usuarios = hobbie.usuarios.filter(e => e.id !== usuarioId);
        return [await this.usuarioRepository.save(usuario),await this.hobbieRepository.save(hobbie)]
    }   
}
