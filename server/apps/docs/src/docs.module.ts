import { Module } from '@nestjs/common';
import { DocumentationModule } from './documentation/documentation.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DocumentationModule,
    MongooseModule.forRoot('mongodb://localhost:27017/DocWriter')
  ],
  controllers: [],
  providers: [],
})
export class DocsModule {}
