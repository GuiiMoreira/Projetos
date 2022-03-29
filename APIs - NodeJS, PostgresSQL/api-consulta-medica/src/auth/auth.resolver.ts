import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UsersType } from "./user.type";
import { AuthCredentialsDto } from "./dto/AuthCredentials.dto";
import { LoginCredentialsDto } from "./dto/LoginCredentials.dto";
import { AuthType } from "./dto/auth.type";

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

    @Mutation(returns => AuthType) async signIn(
        @Args('loginCredentialsDto') loginCredentialsDto: LoginCredentialsDto,
    ) {
        const response = await this.AuthService.signIn(loginCredentialsDto);
        console.log(response)
        return {
            username: response.username,
            token: response.token
        }
    }


    // @Mutation(returns => PacientsType) assignAppointmentsToPacient(
    //     @Args('assignAppointmentsToPacientInput') assignAppointmentsToPacientInput: AssignAppointmentsToPacientInput,
    // ) {

    //     const { pacienteCPF, appointmentIds } = assignAppointmentsToPacientInput
    //     return this.AuthService.assignAppointmentsToPacient(pacienteCPF, appointmentIds);
    // }
}