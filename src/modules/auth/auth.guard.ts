import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from '../user';
import { EntityRepository } from '@mikro-orm/postgresql';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly _userRepository: EntityRepository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const autHeader = req.headers.authorization || '';
    const [bearer, token] = autHeader.split(' ');

    try {
      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          { error: 'Unauthorized' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { userId }: AuthDto = this._jwtService.verify(token);
      const user = await this._userRepository.findOne({ id: userId });

      if (!user || !user.token || token !== user.token) {
        throw new HttpException(
          { error: 'Unauthorized' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
