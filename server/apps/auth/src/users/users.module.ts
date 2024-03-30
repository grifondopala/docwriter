import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.shema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@app/common';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '365d',
      }
    }),
    MongooseModule.forFeature([
      {name: 'Users', schema: UsersSchema}
    ]),
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
  ],
})
export class UsersModule {}
