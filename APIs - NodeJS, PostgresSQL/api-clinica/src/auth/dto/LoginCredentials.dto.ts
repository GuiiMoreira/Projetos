import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator'

@InputType()
export class LoginCredentialsDto {
    @IsNotEmpty()
    @Field()
    cpf: string;

    @IsNotEmpty()
    @Field()
    password: string;
}