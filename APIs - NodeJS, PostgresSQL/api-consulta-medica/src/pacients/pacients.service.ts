import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pacients } from './pacients.entity';
import { CreatePacientInput } from './pacients.input';
import { v4 as uuid } from 'uuid';
import { Appointment } from 'src/appointment/appointment.entity';

@Injectable()
export class PacientsService {
    constructor(
        @InjectRepository(Pacients) private pacientsRepository: Repository<Pacients>,
        @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>

    ) { }

    async getPacients(): Promise<Pacients[]> {
        return this.pacientsRepository.find();
    }

    async getPacient(cpf: string): Promise<Pacients> {
        const pacient = await this.pacientsRepository.findOne({ cpf });

        if (!pacient) {
            throw new NotFoundException(`Pacient with cpf ${cpf} not found`);
        }

        const consultas = await this.appointmentRepository.find({ pacientCPF: cpf })
        pacient.appointments = [...consultas]

        return pacient
    }

    async createPacient(createPacientInput: CreatePacientInput, username: string): Promise<Pacients> {
        const { name, lastname, cpf, birthdate, appointments } = createPacientInput;

        const found = await this.pacientsRepository.findOne({ cpf });

        if (found) {
            throw new ConflictException('Pacient already exists')
        }

        const pacient = this.pacientsRepository.create({
            id: uuid(),
            creator: username,
            name,
            lastname,
            cpf,
            birthdate,
            appointments
        });

        return this.pacientsRepository.save(pacient);
    }


    async deletePacient(createPacientInput: CreatePacientInput): Promise<Pacients> {
        const { cpf } = createPacientInput;

        const pacient = await this.pacientsRepository.findOne({ cpf });

        if (!pacient) {
            throw new NotFoundException(`Pacient with cpf ${cpf} not found`);
        }

        const copy = { ...pacient };

        await this.pacientsRepository.remove(pacient);

        return copy
    }

    async upadtePacient(createPacientInput: CreatePacientInput): Promise<Pacients> {
        const { cpf, name } = createPacientInput;

        const pacient = await this.pacientsRepository.findOne({ cpf });

        if (!pacient) {
            throw new NotFoundException(`Pacient with cpf ${cpf} not found`);
        }

        pacient.name = name

        await this.pacientsRepository.save(pacient)

        return pacient
    }
}
