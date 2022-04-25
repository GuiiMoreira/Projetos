import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class AuthType {

    @Field()
    cpf: string;


    @Field()
    token: string;
}