import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/auth.guard";
import { CreateAppointmentInput } from "./appointment.input";
import { AppointmentService } from "./appointment.service";
import { AppointmentType } from "./appointment.type";

@Resolver(of => AppointmentType)
export class appointmentResolver {
    constructor(
        private appointmentService: AppointmentService
    ) { }

    @UseGuards(GqlAuthGuard)
    @Query(returns => [AppointmentType])
    Appointments() {
        return this.appointmentService.getAppointments();
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => AppointmentType)
    Appointment(
        @Args('cpf') cpf: string,
    ) {
        return this.appointmentService.getAppointment(cpf);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => AppointmentType) createAppointment(
        @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
        @Context() context,
    ) {
        return this.appointmentService.createAppointment(createAppointmentInput, context.req.user.username);
    }

    @UseGuards(GqlAuthGuard)
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