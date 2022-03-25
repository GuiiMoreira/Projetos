import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PacientsModule } from './pacients/pacients.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'SOMOSuM2',
      database: 'api-consulta-medica',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PacientsModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
