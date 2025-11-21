import { Module } from '@nestjs/common';
import { DefaultUserService } from './default-user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [DefaultUserService, AuthService],
  controllers: [AuthController],
  exports: [DefaultUserService],
})
export class AuthModule {}
