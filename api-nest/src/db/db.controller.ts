import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('db')
export class DbController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('status')
  getStatus() {
    return { state: this.connection.readyState };
  }
}
