import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { StudentType } from 'src/student/student.type';

@ObjectType('Appointment')
export class AppointmentType {
    @Field(type => ID)
    id: string;

    @Field()
    pacientCPF: string;

    @Field()
    exam: string;

    @Field()
    examDetails: string;

    @Field()
    value: string;

    @Field()
    date: string;

    @Field()
    createDate: string;

    // @Field(type => [StudentType])
    // students: string[];
}