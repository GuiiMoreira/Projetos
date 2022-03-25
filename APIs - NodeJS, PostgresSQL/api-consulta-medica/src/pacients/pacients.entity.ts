import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Pacients {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    cpf: string;

    @Column()
    birthdate: string;

    //   @Column()
    //   appointment: string[];
}