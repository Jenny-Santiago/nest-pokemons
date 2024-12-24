import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke.response.interface';

@Injectable()
export class SeedService {

    // Inyectamos el modelo de mongo
    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter
    ) { }


    async executeSeed() {

        // Eliminamos todo de la base de datos antes de ejecutar
        // {} asegura que no hay filtros, todos los documentos seran eliminados
        // delete * from pokemons;
        await this.pokemonModel.deleteMany({});

        const data: PokeResponse = await this.http.get('https://pokeapi.co/api/v2/pokemon?limit=650');

        // Obtenemos lo pokemones de la API externa
        const pokemonsAPI: CreatePokemonDto[] = data.results.map(({ name, url }) => {
            const segments = url.split('/');
            const no: number = +segments[segments.length - 2];
            return { name, no }
        });

        // Creamos los documentos en la base de datos por lote
        await this.pokemonModel.insertMany(pokemonsAPI);
        return 'SEED Execute';
    }
}
