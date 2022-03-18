import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpadteTaskStatusDto{
    @IsEnum(TaskStatus)
    status: TaskStatus
}