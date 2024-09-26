/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HobbieEntity } from '../hobbie/hobbie.etntity';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column()
    telefono: string;


    @ManyToMany(() => HobbieEntity, (hobbie) => hobbie.usuarios)
    @JoinTable()
    hobbies: HobbieEntity[];
}