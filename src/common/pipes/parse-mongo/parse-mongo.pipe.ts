import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

// Los Pipes tranforman la data
@Injectable()
export class ParseMongoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    // Comprobamos que sea un id de Mongoose
    if (!isValidObjectId(value)) throw new BadRequestException(`${value} is not a valid MongoID`);

    return value;
  }
}
