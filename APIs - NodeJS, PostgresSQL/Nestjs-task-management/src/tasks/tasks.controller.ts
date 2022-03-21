import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpadteTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksServices: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksServices.getTasks(filterDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksServices.getTasksById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksServices.createTask(createTaskDto)
    }

    @Delete('/:id')
    delTaskById(@Param('id') id: string): Promise<void> {

        return this.tasksServices.delTasksById(id);
    }

    @Patch('/:id/status')
    upadteTaskStatus(@Param('id') id: string, @Body() upadteTaskStatusDto: UpadteTaskStatusDto): Promise<Task> {
        const { status } = upadteTaskStatusDto
        return this.tasksServices.upadteTaskStatus(id, status);
    }

}
