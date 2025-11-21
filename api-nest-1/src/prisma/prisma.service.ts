import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private config: ConfigService) {
    const databaseUrl = config.get<string>('DATABASE_URL') ?? process.env.DATABASE_URL;
    const accelerateUrl = config.get<string>('PRISMA_ACCELERATE_URL') ?? process.env.PRISMA_ACCELERATE_URL;

    if (!databaseUrl && !accelerateUrl) {
      throw new Error('DATABASE_URL ou PRISMA_ACCELERATE_URL deve estar definida.');
    }

    const clientOptions = accelerateUrl
      ? { accelerateUrl }
      : { adapter: { provider: 'mongodb', url: databaseUrl } };

    super(clientOptions as any);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Habilita hooks para fechar o Nest app quando o Prisma emitir beforeExit.
   * Uso: await prismaService.enableShutdownHooks(app);
   *
   * NOTE: Alguns builds do @prisma/client não tipam 'beforeExit' no $on; por isso
   * fazemos um cast local a `any` para evitar o erro de TS "Argument of type '...'
   * is not assignable to parameter of type 'never'".
   */
  async enableShutdownHooks(app: INestApplication) {
    // Solução com cast (resolves TS error quando o evento não está tipado)
    (this as unknown as any).$on('beforeExit', async () => {
      await app.close();
    });

    // Opcional: também capture sinais do processo para garantir shutdown limpo
    process.once('SIGINT', async () => {
      await this.$disconnect();
      process.exit(0);
    });
    process.once('SIGTERM', async () => {
      await this.$disconnect();
      process.exit(0);
    });
  }
}