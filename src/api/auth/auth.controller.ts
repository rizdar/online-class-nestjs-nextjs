import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UtilsService } from 'src/utils/utils.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/libs/jwt-auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private util: UtilsService,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const createdUser = await this.authService.register(data);
    return this.util.response.json({
      statusCode: 201,
      data: createdUser,
      message: 'Create user successfully!',
    });
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.login(body);
    return await this.util.response.json({
      statusCode: 200,
      message: 'Login user successfully!',
      data: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    const dataProfile = await this.authService.profile(req.user.user_id);
    return await this.util.response.json({
      message: 'login user success',
      data: dataProfile,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-user')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUser(@Req() req, @Body() data: UpdateUserDto) {
    const updateUser = await this.authService.updateUser(
      req.user.user_id,
      data,
    );
    return await this.util.response.json({
      message: 'Update user success',
      data: updateUser,
    });
  }
}
