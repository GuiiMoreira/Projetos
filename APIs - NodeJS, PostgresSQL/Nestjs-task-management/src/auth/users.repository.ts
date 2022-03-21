import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/AuthCredentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    // async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    //     const { status, search } = filterDto
    //     const query = this.createQueryBuilder('task')

    //     if (status) {
    //         query.andWhere('task.status = :status', { status })
    //     }

    //     if (search) {
    //         query.andWhere(
    //             'LOWER(task.username) LIKE LOWER(:search) OR LOWER(task.password) LIKE LOWER(:search)',
    //             { search: `%${search}%` }
    //         )
    //     }

    //     const tasks = await query.getMany();

    //     return tasks
    // }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = this.create({
            username,
            password,
        });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') { //23505 é o codigo do erro username duplicado
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }

        return;
    }
}