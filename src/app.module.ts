import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';


// yarn add @nestjs/serve-static para servir contenido estatico
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), // Creamos la conexion a la base de datos
    PokemonModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
