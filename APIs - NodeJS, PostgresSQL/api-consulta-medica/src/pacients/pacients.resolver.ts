import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/auth.guard";
import { CreatePacientInput } from "./pacients.input";
import { PacientsService } from "./pacients.service";
import { PacientsType } from "./pacients.type";

@Resolver(of => PacientsType)
export class PacientsResolver {
    constructor(
        private pacientsService: PacientsService
    ) { }

    @UseGuards(GqlAuthGuard)
    @Query(returns => [PacientsType])
    pacients(

    ) {
        return this.pacientsService.getPacients();
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => PacientsType)
    pacient(
        @Args('cpf') cpf: string,
    ) {
        return this.pacientsService.getPacient(cpf);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => PacientsType) createPacient(
        @Context() context,
        @Args('createPacientInput') createPacientInput: CreatePacientInput,
    ) {
        return this.pacientsService.createPacient(createPacientInput, context.req.user.username);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => PacientsType) deletePacient(
        @Args('createPacientInput') createPacientInput: CreatePacientInput,
    ) {
        return this.pacientsService.deletePacient(createPacientInput);
    }

    @UseGuards(GqlAuthGuard)
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