import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';
import { UserEntity } from './user.entity';
import { genSalt, hash, compare } from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EMAIL_EXIST } from './constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: EntityRepository<UserEntity>,
  ) {}

  async register(body: RegisterDto): Promise<UserEntity> {
    const { password, lastName, firstName, email } = body;
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
}
