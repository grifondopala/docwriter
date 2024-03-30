import { Controller, 
         Post, 
         Body, 
         Request, 
         Get, 
         Delete,
         Param } from '@nestjs/common';

import { Request as req } from 'express';

import { CreateDocumentationDto, DeleteDocumentationDto} from '@app/common'
import { DocumentationService } from './documentation.service';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Controller('documentation')
export class DocumentationController {
  
  constructor(private readonly documentationService: DocumentationService,) {}

  @Post()
  create(@Body() createDocumentationDto: Omit<CreateDocumentationDto, "userId">, @Request() request: req) {
    const token = request.headers?.authorization;
    return this.documentationService.create(createDocumentationDto, token).catch((e: any) => throwError(() => new RpcException(e.error)));
  }

  @Get('get-user-documentations/:username')
  getUserDocumentations(@Param('username') username: string){
    return this.documentationService.getUserDocumentations(username).catch((e: any) => throwError(() => new RpcException(e.error)));
  }

  @Delete()
  delete(@Body() deleteDocumentationDto: Omit<DeleteDocumentationDto, "userId">, @Request() request: req) {
    const token = request.headers?.authorization;
    return this.documentationService.delete(deleteDocumentationDto, token).catch((e: any) => throwError(() => new RpcException(e.error)));
  }

}
