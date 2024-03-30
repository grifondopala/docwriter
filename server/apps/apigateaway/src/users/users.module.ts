import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE_NAME, AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
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
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
