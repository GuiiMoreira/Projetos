import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreatePacientInput {
    @MinLength(1)
    @Field()
    name: string;

    @MinLength(1)
    @Field()
    lastname: string;

    @MinLength(11)
    @Field()
    cpf: string;

    @IsDateString()
    @Field()
    birthdate: string;

    @IsUUID("4", { each: true })
    @Field(() => [ID], { defaultValue: [] })
    appointments: string[];
}