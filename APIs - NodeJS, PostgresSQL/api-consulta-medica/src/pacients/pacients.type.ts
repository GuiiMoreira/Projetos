import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AppointmentType } from 'src/appointment/appointment.type';
import { dateFormatMiddleware, loggerMiddleware } from './pacients.midleware';

@ObjectType('Pacients')
export class PacientsType {
    @Field(type => ID)
    id: string;

    @Field({ middleware: [loggerMiddleware] })
    creator: string

    @Field()
    name: string;

    @Field()
    lastname: string;

    @Field()
    cpf: string;

    @Field({ middleware: [dateFormatMiddleware] })
    birthdate: string;

    @Field(type => [AppointmentType])
    appointments: string[];
}