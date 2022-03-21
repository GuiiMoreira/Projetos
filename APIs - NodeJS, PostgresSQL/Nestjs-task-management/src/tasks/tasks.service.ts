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

    async getTasksById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id)


        if (!found) {
            throw new NotFoundException(`Task with ${id} not found!`)
        }

        return found
    }

    // private tasks: Task[] = [];


    // getAllTasks() : Task[]{
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[]{
    //     const {status, search} = filterDto

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter((task) => task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter((task) => {
    //             if(task.title.toLowerCase().includes(search) || task.description.includes(search)){
    //                 return true
    //             }

    //             return false
    //         })
    //     }

    //     return tasks
    // }

    // getTasksById(id: string): Task {
    //     const found = this.tasks.find((task) => task.id === id)

    //     if(!found){
    //         throw new NotFoundException(`Task with ${id} not found!`)
    //     }


    //     return found
    // }

    // delTasksById(id: string): void {
    //     const found = this.getTasksById(id)
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id)
    // }

    // createTask(createTaskDto: CreateTaskDto) : Task{
    //     const {description, title} = createTaskDto;

    //     const task : Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }

    //     this.tasks.push(task)

    //     return task
    // }

    // upadteTaskStatus(id: string, status: TaskStatus) : Task{
    //     const task = this.getTasksById(id)
    //     task.status = status

    //     return task
    // }
}
