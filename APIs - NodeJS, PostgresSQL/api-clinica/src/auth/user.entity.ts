import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ unique: true })
    cpf: string;

    @Column()
    email: string;

    @Column()
    lastname: string;

    @Column()
    cep: string;

    @Column()
    address: string;

    @Column()
    celnumber: string;

    @Column()
    birthdate: string;

    @Column()
    createDate: string

    @Column()
    gender: string

    @Column()
    healthInsurance: string

    @Column()
    numberHealthInsurance: string
}