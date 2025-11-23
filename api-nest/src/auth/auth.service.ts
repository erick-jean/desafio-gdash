import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DefaultUserService } from './default-user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private defaultUser: DefaultUserService,
  ) {}

  // async register(data) {
  //   return this.usersService.create(data);
  // }

  async login(email: string, password: string) {
    const userDefault = this.defaultUser.getUser();

    // Tenta autenticar pelo usuário padrão do .env
    if (email === userDefault.email && password === userDefault.password) {
      const payload = { sub: 'default-user', email: userDefault.email };
      return {
        message: 'Autenticado com sucesso (usuário padrão)',
        access_token: this.jwtService.sign(payload),
      };
    }

    // Tenta autenticar pelo banco de dados
    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user._id, email: user.email };
    return {
      message: 'Autenticado com sucesso (banco de dados)',
      access_token: this.jwtService.sign(payload),
    };
  }
}
