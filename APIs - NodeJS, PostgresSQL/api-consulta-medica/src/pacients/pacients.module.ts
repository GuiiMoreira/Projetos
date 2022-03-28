import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/appointment.entity';
import { Pacients } from './pacients.entity';
import { PacientsResolver } from './pacients.resolver';
import { PacientsService } from './pacients.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Pacients, Appointment]),
        // StudentModule,
    ],
    providers: [PacientsResolver, PacientsService]
})
export class PacientsModule { }
