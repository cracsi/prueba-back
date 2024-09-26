import { Module } from '@nestjs/common';
import { HobbieController } from './hobbie.controller';
import { HobbieEntity } from './hobbie.etntity';
import { HobbieService } from './hobbie.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    controllers: [HobbieController],
    imports: [TypeOrmModule.forFeature([HobbieEntity])],
    providers:[HobbieService]
})
export class HobbieModule {}
