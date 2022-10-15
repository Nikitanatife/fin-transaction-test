import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const autHeader = req.headers.authorization || '';
    const [bearer, token] = autHeader.split(' ');

    try {
      if (bearer !== 'Bearer' || !token) {
        throw new Error('Unauthorized');
      }

      req.user = this._jwtService.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
