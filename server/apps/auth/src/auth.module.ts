import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
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
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/DocWriter')
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
