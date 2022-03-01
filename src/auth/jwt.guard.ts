import { Injectable, UnauthorizedException, HttpStatus, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

  // canActivate(context: ExecutionContext) {
  //   super.logIn;
  //   return super.canActivate(context);
  // }
  handleRequest(err, user, info,context) {
    console.log({ err, user, info,context });
    return super.handleRequest(err, user, info,context);
  }

  // handleError(err, user, info, context): any {
  //   console.log('in custom handleRequest');
  //   if (err || !user) {
  //     throw new UnauthorizedException({
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       error: 'my custom error',
  //     });
  //   }
  //   return user;
  // }
}