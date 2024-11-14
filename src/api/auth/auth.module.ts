import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { JwtAuthModule } from 'src/libs/jwt-auth/jwt-auth.module';

@Module({
  imports: [UtilsModule, JwtAuthModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
