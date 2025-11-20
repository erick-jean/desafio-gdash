import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DefaultUserService } from './default-user.service';

@Injectable()
export class AuthService {
  constructor(private defaultUser: DefaultUserService) {}

  validate(email: string, password: string) {
    const user = this.defaultUser.getUser();

    if (email === user.email && password === user.password) {
      return { email: user.email };
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }
}
