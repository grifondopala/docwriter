import { Module } from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { DocumentationController } from './documentation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentationSchema } from './documentation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Documentation', schema: DocumentationSchema}
    ]),
  ],
  controllers: [DocumentationController],
  providers: [DocumentationService],
})
export class DocumentationModule {}
