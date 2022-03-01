import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public getJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn:360000,
    });

    return token;  ////asdasdasdsadzxcxzcasdasdasdaszxczxc
  }

  public getJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: 360000,
    });

    return token;
  }




  

 }

