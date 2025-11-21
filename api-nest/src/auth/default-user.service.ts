import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultUserService {
  private user = {
    email: process.env.DEFAULT_USER_EMAIL,
    password: process.env.DEFAULT_USER_PASSWORD,
  };

  getUser() {
    return this.user;
  }
}
