import { IsInt, IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsNumber()
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
    offset?: number;
}