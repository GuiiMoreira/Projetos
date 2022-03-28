import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AppointmentType } from 'src/appointment/appointment.type';
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

    @Field(type => [AppointmentType])
    appointments: string[];
}