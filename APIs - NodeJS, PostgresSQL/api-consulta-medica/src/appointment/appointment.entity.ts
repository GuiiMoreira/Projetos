import { Pacients } from 'src/pacients/pacients.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {
    @PrimaryColumn()
    id: string;

    @Column()
    creator: string

    @Column()
    pacientCPF: string;

    @Column()
    doctorName: string;

    @Column()
    date: string;

    @ManyToOne(type => Pacients, pacient => pacient.appointments, { eager: false })
    pacient: Pacients;
}