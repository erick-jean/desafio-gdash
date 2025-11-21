import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule], // necessário para injetar ConfigService no PrismaService
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}