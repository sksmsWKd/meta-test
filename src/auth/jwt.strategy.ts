import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
        secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
     
    });
  }

  async validate(payload: TokenPayload, done: VerifiedCallback) {
    const user = await this.userRepository.findOne(payload.userId);
    
    return user;
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  // }
}
