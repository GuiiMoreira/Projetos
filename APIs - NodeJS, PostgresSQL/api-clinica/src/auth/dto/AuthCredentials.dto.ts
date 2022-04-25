import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

@InputType()
export class AuthCredentialsDto {
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @Field()
    name: string;

    @MinLength(8)
    @MaxLength(20)
    @IsString()
    @Field()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is to weak'
    })
    password: string;

    @MinLength(11)
    @MaxLength(11)
    @IsString()
    @Field()
    cpf: string;

    @IsString()
    @Field()
    email: string;

    @IsString()
    @Field()
    lastname: string;

    @IsString()
    @Field()
    address: string;

    @IsString()
    @Field()
    cep: string;

    @IsString()
    @Field()
    gender: string;

    @IsString()
    @Field()
    celnumber: string;

    @IsString()
    @Field()
    birthdate: string;

    @IsString()
    @Field()
    healthInsurance: string;

    @IsString()
    @Field()
    numberHealthInsurance: string
}