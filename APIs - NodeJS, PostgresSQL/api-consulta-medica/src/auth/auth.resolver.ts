import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UsersType } from "./user.type";
import { AuthCredentialsDto } from "./dto/AuthCredentials.dto";
import { LoginCredentialsDto } from "./dto/LoginCredentials.dto";

@Resolver(of => UsersType)
export class AuthResolver {
    constructor(
        private AuthService: AuthService
    ) { }



    @Mutation(returns => UsersType) signUp(
        @Args('authCredentialsDto') authCredentialsDto: AuthCredentialsDto,
    ) {
        return this.AuthService.signUp(authCredentialsDto);
    }

    @Mutation(returns => UsersType) signIn(
        @Args('loginCredentialsDto') loginCredentialsDto: LoginCredentialsDto,
    ) {
        return this.AuthService.signIn(loginCredentialsDto);
    }


    // @Mutation(returns => PacientsType) assignAppointmentsToPacient(
    //     @Args('assignAppointmentsToPacientInput') assignAppointmentsToPacientInput: AssignAppointmentsToPacientInput,
    // ) {

    //     const { pacienteCPF, appointmentIds } = assignAppointmentsToPacientInput
    //     return this.AuthService.assignAppointmentsToPacient(pacienteCPF, appointmentIds);
    // }
}