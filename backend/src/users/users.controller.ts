import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('skill/:skillId')
  findBySkill(@Param('skillId') skillId: string) {
    return this.usersService.findBySkill(skillId);
  }

  @Get('service/:serviceId')
  findByService(@Param('serviceId') serviceId: string) {
    return this.usersService.findByService(serviceId);
  }

  @Get('project/:projectId')
  findByOwnedProject(@Param('projectId') projectId: string) {
    return this.usersService.findByOwnedProject(projectId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('update/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':userId/skills/:skillId')
  addSkillToUser(
    @Param('userId') userId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.usersService.addSkillToUser(userId, skillId);
  }

  @Delete(':userId/skills/:skillId')
  removeSkillFromUser(
    @Param('userId') userId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.usersService.removeSkillFromUser(userId, skillId);
  }
}
