import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('db')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('db')
export class DbController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('status')
  getStatus() {
    return { state: this.connection.readyState };
  }
}
