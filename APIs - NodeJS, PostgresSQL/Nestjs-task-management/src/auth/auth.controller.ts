import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body() loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(loginCredentialsDto)
    }
}
