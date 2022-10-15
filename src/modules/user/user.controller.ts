import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './dto';
import { UserEntity } from './user.entity';
import { configService } from '../../config';
import { AuthDto, AuthGuard, User } from '../auth';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto): Promise<UserEntity> {
    return this._userService.register(body);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<UserEntity> {
    return this._userService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@User() user: AuthDto): Promise<void> {
    return this._userService.logout(user.userId);
  }
}
