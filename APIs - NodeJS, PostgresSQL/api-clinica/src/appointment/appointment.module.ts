import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './Appointment.entity';
import { appointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    // StudentModule,
  ],
  providers: [appointmentResolver, AppointmentService]
})
export class AppointmentModule { }
