import { IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    // Definimos los atributos que necesitamos de la data 
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    @IsInt()
    @Min(1)
    no: number;
}
