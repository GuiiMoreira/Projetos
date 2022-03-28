import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateAppointmentInput } from "./appointment.input";
import { AppointmentService } from "./appointment.service";
import { AppointmentType } from "./appointment.type";

@Resolver(of => AppointmentType)
export class appointmentResolver {
    constructor(
        private appointmentService: AppointmentService
    ) { }

    @Query(returns => [AppointmentType])
    Appointments() {
        return this.appointmentService.getAppointments();
    }

    @Query(returns => AppointmentType)
    Appointment(
        @Args('cpf') cpf: string,
    ) {
        return this.appointmentService.getAppointment(cpf);
    }

    @Mutation(returns => AppointmentType) createAppointment(
        @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    ) {
        return this.appointmentService.createAppointment(createAppointmentInput);
    }

    @Mutation(returns => AppointmentType) deleteAppointment(
        @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    ) {
        return this.appointmentService.deleteAppointment(createAppointmentInput);
    }


    // @Mutation(returns => AppointmentType) upadteAppointment(
    //     @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    // ) {
    //     return this.appointmentService.upadteAppointment(createAppointmentInput);
    // }
}