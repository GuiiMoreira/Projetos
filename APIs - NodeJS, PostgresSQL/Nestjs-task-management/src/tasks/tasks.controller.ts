import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpadteTaskStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksServices: TasksService){}
    

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto) :Task[] {

        if(Object.keys(filterDto).length){
            return this.tasksServices.getTasksWithFilter(filterDto)
        } else {
            return this.tasksServices.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string) :Task {

        return this.tasksServices.getTasksById(id);
    }

    @Delete('/:id')
    delTaskById(@Param('id') id:string) :void {

        return this.tasksServices.delTasksById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) :Task{

        return this.tasksServices.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    upadteTaskStatus(@Param('id') id:string, @Body() upadteTaskStatusDto: UpadteTaskStatusDto) :Task {
        const {status} = upadteTaskStatusDto
        return this.tasksServices.upadteTaskStatus(id, status);
    }



    // @Post()
    // createTask(@Body() body) :Task{

    //     console.log('body:', body)
    //     return
    // }

}
