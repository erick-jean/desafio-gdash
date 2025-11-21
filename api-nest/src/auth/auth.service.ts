import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DefaultUserService } from './default-user.service';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
  constructor(private defaultUser: DefaultUserService) {}

  validate(email: string, password: string) {
    const user = this.defaultUser.getUser();

    if (email === user.email && password === user.password)
      return { message: 'Autenticado com sucesso' };

    throw new UnauthorizedException('Credenciais inválidas');
  }
}
