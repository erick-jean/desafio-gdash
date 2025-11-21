import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    // obtém o PrismaService do container do Nest
  const prisma = app.get(PrismaService);

  try {
    // tenta conectar (lança se der problema)
    await prisma.$connect();
    console.log('✅ Prisma conectado com sucesso');
  } catch (err) {
    console.error('❌ Falha ao conectar ao banco via Prisma:', err);
    // opcional: encerra o processo para sinalizar falha no startup
    process.exit(1);
  }
  
  // Validação global dos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // obtém o PrismaService do container do Nest
//   const prisma = app.get(PrismaService);

//   try {
//     // tenta conectar (lança se der problema)
//     await prisma.$connect();
//     console.log('✅ Prisma conectado com sucesso');
//   } catch (err) {
//     console.error('❌ Falha ao conectar ao banco via Prisma:', err);
//     // opcional: encerra o processo para sinalizar falha no startup
//     process.exit(1);
//   }

//   // opcional: habilita shutdown hooks se você tiver implementado
//   // await prisma.enableShutdownHooks(app);

//   await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
//   console.log(`Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}`);
// }
// bootstrap();