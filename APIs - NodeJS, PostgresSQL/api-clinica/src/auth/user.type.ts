import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Users')
export class UsersType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    lasname: string;

    @Field()
    cpf: string;

    @Field()
    email: string;

    @Field()
    birthdate: string;

    @Field()
    celnumber: string;

    @Field()
    cep: string;

    @Field()
    address: string;

    @Field()
    createDate: string;

    @Field()
    gender: string;

    @Field()
    healthInsurance: string

    @Field()
    numberHealthInsurance: string
}