import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './Appointment.entity';
import { CreateAppointmentInput } from './Appointment.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment) private AppointmentRepository: Repository<Appointment>,
    ) { }

    async getAppointments(): Promise<Appointment[]> {
        return this.AppointmentRepository.find();
    }

    async getAppointment(pacientCPF: string): Promise<Appointment> {
        const Appointment = await this.AppointmentRepository.findOne({ pacientCPF });

        if (!Appointment) {
            throw new NotFoundException(`Appointment with cpf ${pacientCPF} not found`);
        }

        return Appointment
    }

    async createAppointment(createAppointmentInput: CreateAppointmentInput, creator: string): Promise<Appointment> {
        const { pacientCPF, doctorName, date } = createAppointmentInput;
        const id = uuid();

        const Appointment = this.AppointmentRepository.create({
            id,
            creator,
            pacientCPF,
            doctorName,
            date,
        });

        return this.AppointmentRepository.save(Appointment);
    }


    async deleteAppointment(createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
        const { pacientCPF } = createAppointmentInput;

        const Appointment = await this.AppointmentRepository.findOne({ pacientCPF });

        if (!Appointment) {
            throw new NotFoundException(`Appointment with cpf ${pacientCPF} not found`);
        }

        const copy = { ...Appointment };

        await this.AppointmentRepository.remove(Appointment);

        return copy
    }


    // async upadteAppointment(createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
    //     const { pacientCPF, date } = createAppointmentInput;

    //     const Appointment = await this.AppointmentRepository.findOne({ pacientCPF, date });

    //     if (!Appointment) {
    //         throw new NotFoundException(`Appointment with cpf ${pacientCPF} not found`);
    //     }

    //     Appointment.name = name

    //     await this.AppointmentRepository.save(Appointment)

    //     return Appointment
    // }
}
