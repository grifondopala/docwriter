import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DOCUMENTATION_SERVICE_NAME, DOCUMENTATION_PACKAGE_NAME, USERS_SERVICE_NAME, AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { DocumentationController } from './documenation.controller';
import { DocumentationService } from './documentation.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: DOCUMENTATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "localhost:5001",
          package: DOCUMENTATION_PACKAGE_NAME,
          protoPath: join(__dirname, '../documentation.proto'),
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
          }
        }
      }
    ]),
    ClientsModule.register([
      {
        name: USERS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "localhost:5000",
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
          }
        }
      }
    ])
  ],
  controllers: [DocumentationController],
  providers: [DocumentationService],
})
export class DocumentationModule {}