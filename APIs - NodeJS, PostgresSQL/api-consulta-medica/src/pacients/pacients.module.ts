import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pacients } from './pacients.entity';
import { PacientsResolver } from './pacients.resolver';
import { PacientsService } from './pacients.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Pacients]),
        // StudentModule,
    ],
    providers: [PacientsResolver, PacientsService]
})
export class PacientsModule { }
