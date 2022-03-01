import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './Google.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [//
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1 day', //얼마나 지속할껀지 지금은 1시간
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtRefreshTokenStrategy,
    FacebookStrategy,
    UserService,
    JwtStrategy,
    GoogleStrategy
  ],
})
export class AuthModule {}
//asd