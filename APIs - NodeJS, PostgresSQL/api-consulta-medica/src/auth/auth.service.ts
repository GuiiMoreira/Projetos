import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';
import * as bcrypt from 'bcrypt'
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.usersRepository.create({
            username,
            password: hashedPassword,
        });

        try {
            return await this.usersRepository.save(user);
        } catch (error) {
            if (error.code === '23505') { //23505 é o codigo do erro username duplicado
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }

    }

    async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<AuthType> {
        const { username, password } = loginCredentialsDto
        const user = await this.usersRepository.findOne({ username })

        const comparePassword = await bcrypt.compare(password, user.password)

        if (user && comparePassword) {
            const payload: JwtPayload = { username }
            const token: string = await this.jwtService.sign(payload);


            return {
                username,
                token
            }
        } else {
            throw new UnauthorizedException('User or password is wrong')
        }
    }
}
