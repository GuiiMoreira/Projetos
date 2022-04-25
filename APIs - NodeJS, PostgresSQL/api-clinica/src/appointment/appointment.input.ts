import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
    @Field()
    exam: string;

    @Field()
    examDetails: string;

    @Field()
    value: string;

    @Field()
    date: string;

    //   @IsUUID("4", { each: true })
    //   @Field(() => [ID], { defaultValue: [] })
    //   students: string[];
}


@InputType()
export class DeleteAppointmentInput {
    @Field()
    id: string;
}