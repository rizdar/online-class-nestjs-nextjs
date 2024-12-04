import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import jwtConfig from 'src/config/jwt.config';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private repo: RepositoriesService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const user = await this.repo.user.findUserByEmail(data.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    data.password = await bcrypt.hash(data.password, 12);

    const createdUser = await this.repo.user.create(data);
    if (createdUser) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  }

  async login(data: LoginDto) {
    const checkUser = await this.repo.user.findUserByEmail(data.email);
    if (!checkUser) {
      throw new BadRequestException('User not found');
    }
    const validateUser = await bcrypt.compare(
      data.password,
      checkUser.password,
    );
    if (validateUser) {
      return {
        accessToken: await this.jwtService.sign(
          {
            sub: checkUser.id,
            email: checkUser.email,
            name: checkUser.name,
            user_type: checkUser.user_type,
            avatat: checkUser.avatar,
          },
          {
            expiresIn: jwtConfig().user_expired,
            secret: jwtConfig().user_secret,
          },
        ),
        user: {
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
          user_type: checkUser.user_type,
          avatar: checkUser.avatar,
        },
      };
    }
    throw new BadRequestException('Username and password not match');
  }

  async profile(id_user: string) {
    const checkUser = await this.repo.user.findUserById(id_user);

    if (checkUser) {
      return {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        avatar: checkUser.avatar,
      };
    }

    throw new NotFoundException('user not found!');
  }

  async updateUser(id_user: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    const update = await this.repo.user.updateUserByID(id_user, data);
    if (update) {
      return {
        success: true,
      };
    }
    throw new InternalServerErrorException('Update user error');
  }
}
