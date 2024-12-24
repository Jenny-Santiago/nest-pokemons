import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Si quiero que sea un documento debo extender de Document de Mongoose
// Le agrega todas las funcionalidades necesarias

@Schema()
export class Pokemon extends Document {
    
    // id: string ==== MONGO YA ME LO DA

    @Prop({
        unique: true,
        index: true // Sabe donde esta el elemento que estamos buscando
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;
}

// Exportamos el esquema 
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
