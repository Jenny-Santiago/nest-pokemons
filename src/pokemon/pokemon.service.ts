import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dt';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  // El ConfigService solo estara disponible si el modulo ha importado el ConfigModule
  constructor(
    @InjectModel(Pokemon.name) // Tenemos que indiar que puede ser inyectado
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    // Inicializamos el limite por defecto
    this.defaultLimit = this.configService.get<number>('defaultLimit');
    console.log(this.defaultLimit);
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      // Creamos el pokemon
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`);
      }

      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel.find()// Obtiene todos los elementos si no se le especifica nada
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1 // Indica que ordena de manera ascendente la columna de no
      })
      .select('-__v'); // Eliminamos el campo __v de la respuesta
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    try {
      // Buscamos por numero
      if (!isNaN(Number(term))) {
        pokemon = await this.pokemonModel.findOne({ no: term });
      }

      // Buscamos por nombre
      if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
      }

      // Buscamos por MongoId
      if (!pokemon && isValidObjectId(term)) {
        pokemon = await this.pokemonModel.findById(term);
      }

      if (!pokemon)
        throw new NotFoundException(`Pokemon with id, name or number "${term}" not found`);
    } catch (error) {
      console.log(error);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    // Buscamos el pokemon de acuerdo a la url (id, nombre, numero)
    const pokemon = await this.findOne(term);

    try {
      // La actualizacion puede proceder
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${id} not found`);

    return { id };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in the DB ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException(`Can't create Pokemon - Check server log`);
  }
}
