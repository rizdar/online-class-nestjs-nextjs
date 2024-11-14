import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConfig().user_secret,
      signOptions: {
        expiresIn: jwtConfig().user_expired,
      },
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [JwtService],
})
export class JwtAuthModule {}
