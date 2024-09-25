/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity()
export class HobbieEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;


    @ManyToMany(() => UsuarioEntity, (usuario) => usuario.hobbies)
    usuarios: UsuarioEntity[]
}