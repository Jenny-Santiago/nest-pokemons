import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

// Hereda las propiedades del createPokemonDto, pero son opcionales pueden o no venir
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
