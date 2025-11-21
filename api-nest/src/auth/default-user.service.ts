import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultUserService {
  getUser() {
    return {
      email: process.env.DEFAULT_USER_EMAIL,
      password: process.env.DEFAULT_USER_PASSWORD,
    };
  }
}
