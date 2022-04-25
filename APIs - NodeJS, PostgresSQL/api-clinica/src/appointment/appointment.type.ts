import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { StudentType } from 'src/student/student.type';

@ObjectType('Appointment')
export class AppointmentType {
    @Field(type => ID)
    id: string;

    @Field()
    creator: string;

    @Field()
    pacientCPF: string;

    @Field()
    doctorName: string;

    @Field()
    date: string;

    // @Field(type => [StudentType])
    // students: string[];
}