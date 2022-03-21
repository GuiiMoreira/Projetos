import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) { }

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto)
    }

    async getTasksById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);


        if (!found) {
            throw new NotFoundException(`Task with ${id} not found!`)
        };

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async delTasksById(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found!`)
        }
    }


    async upadteTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTasksById(id)
        task.status = status

        await this.tasksRepository.save(task)

        return task
    }
}
