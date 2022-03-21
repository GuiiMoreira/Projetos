import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.inerface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto)
    }

    async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = loginCredentialsDto
        const user = await this.usersRepository.findOne({ username })
        const comparePassword = await bcrypt.compare(password, user.password)

        if (user && comparePassword) {
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload);

            return { accessToken }
        } else {
            throw new UnauthorizedException('User or password is wrong')
        }
    }
}
