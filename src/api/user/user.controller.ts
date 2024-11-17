import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilsService } from 'src/utils/utils.service';
import { JwtAuthGuard } from 'src/libs/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private util: UtilsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.util.response.json({
      data: await this.userService.create(createUserDto),
      message: 'create user successfully!',
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.util.response.json({
      data: await this.userService.findAll(),
      message: 'get users succesfully!',
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.util.response.json({
      data: await this.userService.findOne(id),
      message: 'get user successfully!',
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.util.response.json({
      data: await this.userService.update(id, updateUserDto),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.util.response.json({
      data: await this.userService.remove(id),
      message: 'Remove user success',
    });
  }
}
