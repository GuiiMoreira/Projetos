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
        return {
            cpf: response.cpf,
            token: response.token,
            name: response.name
        }
    }
}