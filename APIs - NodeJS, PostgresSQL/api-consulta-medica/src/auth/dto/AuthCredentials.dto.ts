import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

@InputType()
export class AuthCredentialsDto {
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @Field()
    username: string;

    @MinLength(8)
    @MaxLength(20)
    @IsString()
    @Field()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is to weak'
    })
    password: string;
}