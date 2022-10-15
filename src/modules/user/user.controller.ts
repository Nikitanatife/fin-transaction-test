import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto';
import { UserEntity } from './user.entity';
import { configService } from '../../config';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto): Promise<UserEntity> {
    return this._userService.register(body);
  }
}
