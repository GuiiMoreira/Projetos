import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Users')
export class UsersType {
    @Field(type => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    password: string;
}