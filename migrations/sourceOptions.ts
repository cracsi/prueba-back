

import { join } from "path";
import { DataSource,DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions ={
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Usuarios',
      
      entities: ["dist/**/*.entity{.ts,.js}" ], 
      migrations:  [__dirname+'dist/migrations/mig/*{.ts,.js}']
};

const dataSource= new DataSource(dataSourceOptions);
export default dataSource;