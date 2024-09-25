/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class HobbieDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;

 @IsString()
 @IsNotEmpty()
 readonly descripcion: string;


 @IsString()
 @IsNotEmpty()
 readonly rating: number;

}