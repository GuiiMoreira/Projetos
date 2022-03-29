import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class AuthType {

    @Field()
    username: string;


    @Field()
    token: string;
}