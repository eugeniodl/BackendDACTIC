
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //const newvariable = 10;

  const config = new DocumentBuilder()
    .setTitle('API CRUD _ TALLER UNI')
    .setDescription('CRUD basico demo de despliegue')
    .setVersion('1.0')
    .addTag('APICRUD')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

