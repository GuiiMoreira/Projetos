import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pacients } from './pacients.entity';
import { CreatePacientInput } from './pacients.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PacientsService {
    constructor(
        @InjectRepository(Pacients) private pacientsRepository: Repository<Pacients>
    ) { }

    async getPacients(): Promise<Pacients[]> {
        return this.pacientsRepository.find();
    }

    async getPacient(cpf: string): Promise<Pacients> {
        const pacient = await this.pacientsRepository.findOne({ cpf });

        if (!pacient) {
            throw new NotFoundException(`Pacient with cpf ${cpf} not found`);
        }

        return pacient
    }

    async createPacient(createPacientInput: CreatePacientInput): Promise<Pacients> {
        const { name, lastname, cpf, birthdate } = createPacientInput;

        const pacient = this.pacientsRepository.create({
            id: uuid(),
            name,
            lastname,
            cpf,
            birthdate
        });

        return this.pacientsRepository.save(pacient);
    }


    async deletePacient(createPacientInput: CreatePacientInput): Promise<Pacients> {
        const { name, lastname, cpf, birthdate } = createPacientInput;

        const pacient = await this.pacientsRepository.findOne({ cpf });

        if (!pacient) {
            throw new NotFoundException(`Pacient with cpf ${cpf} not found`);
        }

        const copy = { ...pacient };

        await this.pacientsRepository.remove(pacient);

        return copy
    }
}
