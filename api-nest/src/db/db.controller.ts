import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';

@ApiTags('db')
@Controller('db')
export class DbController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('status')
  getStatus() {
    return { state: this.connection.readyState };
  }
}
