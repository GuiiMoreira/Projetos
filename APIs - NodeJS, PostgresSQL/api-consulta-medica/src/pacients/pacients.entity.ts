import { type } from 'os';
import { Appointment } from '../appointment/appointment.entity'
import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';

@Entity()
export class Pacients {
    @PrimaryColumn()
    id: string;

    @Column()
    creator: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    cpf: string;

    @Column()
    birthdate: string;

    @OneToMany(_type => Appointment, appointments => appointments.pacient, { eager: true })
    appointments;
}