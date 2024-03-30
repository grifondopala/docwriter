import { NestFactory } from '@nestjs/core';
import { DocsModule } from './docs.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DOCUMENTATION } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DocsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: "localhost:5001",
        protoPath: join(__dirname, '../documentation.proto'),
        package: DOCUMENTATION,
        loader: {   keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true },
      }
    }
  )
  await app.listen();
}
bootstrap();
