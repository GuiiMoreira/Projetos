import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class AuthType {

    @Field()
    cpf: string;

    @Field()
    name: string;

    @Field()
    token: string;
}