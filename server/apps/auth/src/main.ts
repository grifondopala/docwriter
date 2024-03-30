import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: "localhost:5000",
        protoPath: join(__dirname, '../auth.proto'),
        package: AUTH,
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
