import * as Joi from "joi";

// Crear un validation schema
// Si el valor no viene entonces crea la viable de entorno y al legar al .env.config.ts lo inyecta con el valor x defecto 
export const JoiValidationSchema = Joi.object({
    MONGO_DB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),
});