import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {
    @PrimaryColumn()
    id: string;

    @Column()
    pacientCPF: string;

    @Column()
    exam: string;

    @Column()
    examDetails: string;

    @Column()
    value: string;

    @Column()
    date: string;

    @Column()
    createDate: string;
}