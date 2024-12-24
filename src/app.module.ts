import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';


// yarn add @nestjs/config para las variables de entorno
// yarn add @nestjs/serve-static para servir contenido estatico
@Module({
  imports: [
    // Hacemos accesibles las variables de entorno en la aplicacion
    // Inicializamos el modulo para que cargue el .env
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    MongooseModule.forRoot(process.env.MONGO_DB,{
      dbName: 'pokemonsdb'
    }), // Creamos la conexion a la base de datos

    PokemonModule,

    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
