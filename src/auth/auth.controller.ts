import {JwtRefreshGuard} from './jwt-refresh.guard';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Query,
    Redirect,
    Req,
    Request,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {Request as Re , Response} from 'express';
import {CurrentUser} from 'src/decorators/user.decorator';
import {User} from 'src/entities/user.entity';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserService} from 'src/user/user.service';
import { SetCookieInterceptor } from './set-cookie.interceptor';
import { JwtGuard } from './jwt.guard';
import { GqlAuthGuard } from './gqlauth.guard';
import { use } from 'passport';


@Controller('api/auth')
@ApiTags('인증 API')
export class AuthController {
    constructor(
        private authService : AuthService,
        private userService : UserService
    ) {}


@Get('/cookies')
getCookies(@Req() req:Request):any{
   console.log(req)
}




    @UseGuards(JwtGuard)
          @UseInterceptors(SetCookieInterceptor)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
      }

      

    @Get('/google')
    @ApiOperation({summary: '구글 로그인', description: '구글 로그인하기'})
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req()req) {
        console.log(req)
    }

  
    @Get('/google/redirect')
    @UseGuards(AuthGuard('google'))

    @Redirect('http://localhost:4000')
    async googleAuthRedirect(
        @CurrentUser()user : User,
        @Res({passthrough: true})response : Response,
    ) {
        const accessToken = this.authService.getJwtAccessToken(user.id);
        const refreshToken = this
            .authService
            .getJwtRefreshToken(user.id);
            response.setHeader('Authorization', `Bearer ${accessToken}`);
        response.cookie('token', refreshToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 3600000
        });
        return user;
        // return this.authService.googleLogin(req)
    }

    @Post('/signUp')
    signUp(@Body('user')user) {
        // this.authService
        console.log(user);
    }

    @Post('/signIn')
    signIng(@Body('user')user) {
        // this.authService
        console.log(user);
    }

    @Get('/logout')
    async logout(@Res({passthrough: true})res : Response) {
        res.clearCookie('Refresh');
        return true;
    }
    @Get('/facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin(): Promise<any> {
        // return HttpStatus.OK;
    }

    @Get('/facebook/redirect')
    @Redirect('http://localhost:3000')
    @UseGuards(AuthGuard('facebook'))
    async facebookLoginRedirect(
        @CurrentUser()user : User,
        @Res({passthrough: true})response : Response,
    ) {
        const refreshToken = this
            .authService
            .getJwtRefreshToken(user.id);

        response.cookie('token', refreshToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 3600000
        });
        return;
    }
    @UseGuards(JwtRefreshGuard)
    @Get('/refresh')
    accessGet(
        @Request()req : Re,
        @CurrentUser()user : User,
        @Res()res : Response,
    ) {
        const accessToken = this
            .authService
            .getJwtAccessToken(user.id);

        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return user;
    }

    @Get('/test')
    @Redirect('http://localhost:3000')
    async findAll(@Res({passthrough: true})response : Response) {
        const refreshToken = await this
            .authService
            .getJwtRefreshToken(1);
        response.cookie('token', refreshToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 36000000
        });
        return '1';
    }


}