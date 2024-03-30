import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DocumentationModule } from './documentation/documentation.module';

@Module({
  imports: [UsersModule, DocumentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
