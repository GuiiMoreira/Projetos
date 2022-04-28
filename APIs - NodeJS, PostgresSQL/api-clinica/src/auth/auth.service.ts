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
        const { name, password, cpf, lastname, email, cep, address, celnumber, birthdate, gender, healthInsurance, numberHealthInsurance } = authCredentialsDto;

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(new Date().toISOString())

        const user = this.usersRepository.create({
            name,
            password: hashedPassword,
            cpf,
            lastname,
            email,
            cep,
            address,
            celnumber,
            birthdate,
            createDate: new Date().toISOString(),
            gender,
            healthInsurance,
            numberHealthInsurance
        });

        try {
            return await this.usersRepository.save(user);
        } catch (error) {
            if (error.code === '23505') { //23505 é o codigo do erro cpf duplicado
                throw new ConflictException('cpf or email already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }

    }

    async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<AuthType> {
        const { cpf, password } = loginCredentialsDto
        const user = await this.usersRepository.findOne({ cpf })

        const comparePassword = await bcrypt.compare(password, user.password)

        if (user && comparePassword) {
            const payload: JwtPayload = { cpf }
            const token: string = await this.jwtService.sign(payload);


            return {
                cpf,
                token
            }
        } else {
            throw new UnauthorizedException('User or password is wrong')
        }
    }
}
