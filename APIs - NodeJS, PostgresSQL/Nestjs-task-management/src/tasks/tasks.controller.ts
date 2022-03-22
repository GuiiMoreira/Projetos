import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decaoration';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpadteTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController')
    constructor(private tasksServices: TasksService) { }

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters ${JSON.stringify(filterDto)}`)
        return this.tasksServices.getTasks(filterDto, user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksServices.getTasksById(id, user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        this.logger.verbose(`User "${user.username}" create a new task. Data: ${createTaskDto}`)
        return this.tasksServices.createTask(createTaskDto, user)
    }

    @Delete('/:id')
    delTaskById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<void> {

        return this.tasksServices.delTasksById(id, user);
    }

    @Patch('/:id/status')
    upadteTaskStatus(
        @Param('id') id: string,
        @Body() upadteTaskStatusDto: UpadteTaskStatusDto,
        @GetUser() user: User
    ): Promise<Task> {
        const { status } = upadteTaskStatusDto
        return this.tasksServices.upadteTaskStatus(id, status, user);
    }

}
