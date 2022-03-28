import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePacientInput } from "./pacients.input";
import { PacientsService } from "./pacients.service";
import { PacientsType } from "./pacients.type";

@Resolver(of => PacientsType)
export class PacientsResolver {
    constructor(
        private pacientsService: PacientsService
    ) { }

    @Query(returns => [PacientsType])
    pacients() {
        return this.pacientsService.getPacients();
    }

    @Query(returns => PacientsType)
    pacient(
        @Args('cpf') cpf: string,
    ) {
        return this.pacientsService.getPacient(cpf);
    }

    @Mutation(returns => PacientsType) createPacient(
        @Args('createPacientInput') createPacientInput: CreatePacientInput,
    ) {
        return this.pacientsService.createPacient(createPacientInput);
    }

    @Mutation(returns => PacientsType) deletePacient(
        @Args('createPacientInput') createPacientInput: CreatePacientInput,
    ) {
        return this.pacientsService.deletePacient(createPacientInput);
    }

    @Mutation(returns => PacientsType) upadtePacient(
        @Args('createPacientInput') createPacientInput: CreatePacientInput,
    ) {
        return this.pacientsService.upadtePacient(createPacientInput);
    }

    // @Mutation(returns => PacientsType) assignAppointmentsToPacient(
    //     @Args('assignAppointmentsToPacientInput') assignAppointmentsToPacientInput: AssignAppointmentsToPacientInput,
    // ) {

    //     const { pacienteCPF, appointmentIds } = assignAppointmentsToPacientInput
    //     return this.pacientsService.assignAppointmentsToPacient(pacienteCPF, appointmentIds);
    // }
}