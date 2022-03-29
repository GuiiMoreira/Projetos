import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AppointmentType } from 'src/appointment/appointment.type';

@ObjectType('Pacients')
export class PacientsType {
    @Field(type => ID)
    id: string;

    @Field()
    creator: string

    @Field()
    name: string;

    @Field()
    lastname: string;

    @Field()
    cpf: string;

    @Field()
    birthdate: string;

    @Field(type => [AppointmentType])
    appointments: string[];
}