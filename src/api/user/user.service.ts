import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoriesService } from 'src/repositories/repositories.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private repo: RepositoriesService) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.repo.user.findUserByEmail(createUserDto.email);
    if (checkUser) {
      throw new ConflictException('User already exists');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const createuser = await this.repo.user.create(createUserDto);
    if (createuser) {
      return {
        status: 'success',
      };
    }
  }

  async findAll() {
    return await this.repo.user.findAllUsers();
  }

  async findOne(id: string) {
    return await this.repo.user.findUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password);
    }

    const updatedUser = await this.repo.user.updateUserByID(id, updateUserDto);
    if (updatedUser) {
      delete updateUserDto.password;
    }

    return updatedUser;
  }

  async remove(id: string) {
    const updatedUser = await this.repo.user.updateUserByID(id, {
      is_active: false,
    });
    if (updatedUser) {
      return { success: true };
    }
    return {
      success: false,
    };
  }
}
