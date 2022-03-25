import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { StudentType } from 'src/student/student.type';

@ObjectType('Pacients')
export class PacientsType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    lastname: string;

    @Field()
    cpf: string;

    @Field()
    birthdate: string;


    //   @Field(type => [StudentType])
    //   students: string[];
}