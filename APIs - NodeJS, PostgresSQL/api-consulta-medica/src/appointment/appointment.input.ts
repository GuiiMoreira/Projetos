import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
    @MinLength(1)
    @Field()
    pacientCPF: string;

    @MinLength(1)
    @Field()
    doctorName: string;

    @MinLength(11)
    @Field()
    date: string;

    //   @IsUUID("4", { each: true })
    //   @Field(() => [ID], { defaultValue: [] })
    //   students: string[];
}