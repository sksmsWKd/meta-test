import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FacebookStrategy } from './auth/facebook.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/ormconfig';
import { UserModule } from './user/user.module';
import { LessonsModule } from './lessons/lessons.module';
import { SignupsController } from './signups/signups.controller';
import { SignupsService } from './signups/signups.service';

import { SignupsModule } from './signups/signups.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  controllers: [AppController],
  providers: [AppService ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    LessonsModule,
    SignupsModule,
    ConfigModule.forRoot({ isGlobal: true,}),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {expiresIn: '6000s'}
    })],

})
export class AppModule {}
