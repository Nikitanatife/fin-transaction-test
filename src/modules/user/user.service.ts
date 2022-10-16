import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { UserEntity } from './user.entity';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EMAIL_EXIST, NOT_VALID_CREDENTIALS } from './constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: EntityRepository<UserEntity>,
    private readonly _jwtService: JwtService,
  ) {}

  async register({
    password,
    lastName,
    firstName,
    email,
  }: RegisterDto): Promise<UserEntity> {
    const user = await this._userRepository.findOne({ email });

    if (user) {
      throw new HttpException({ error: EMAIL_EXIST }, HttpStatus.BAD_REQUEST);
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const newUser = await this._userRepository.create({
      email,
      password: passwordHash,
      lastName,
      firstName,
    });

    await this._userRepository.persistAndFlush(newUser);

    return { ...newUser, password: '' };
  }

  async login({ password, email }: LoginDto): Promise<UserEntity> {
    const user = await this._userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        { error: NOT_VALID_CREDENTIALS },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException(
        { error: NOT_VALID_CREDENTIALS },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = this._jwtService.sign({ userId: user.id });

    await this._userRepository.assign(user, { token });
    await this._userRepository.persistAndFlush(user);

    return { ...user, password: '' };
  }

  async logout(user: UserEntity): Promise<void> {
    await this._userRepository.assign(user, { token: null });
    await this._userRepository.persistAndFlush(user);
  }
}
