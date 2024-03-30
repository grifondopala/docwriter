import { Controller } from '@nestjs/common';
import { DocumentationService } from './documentation.service';

import { DocumentationServiceControllerMethods, 
         DocumentationServiceController, 
         CreateDocumentationDto, 
         DeleteDocumentationDto, 
         GetUserDocumentationsDto } from '@app/common/types/documentation';
import { RpcException } from '@nestjs/microservices';

@Controller()
@DocumentationServiceControllerMethods()
export class DocumentationController implements DocumentationServiceController {

  constructor(private readonly documentationService: DocumentationService) {}
  
  createDocumetation(createDocumentationDto: CreateDocumentationDto){
    return this.documentationService.create(createDocumentationDto);
  }

  getUserDocumentations(getUserDocumentationsDto: GetUserDocumentationsDto){
    return this.documentationService.getUserDocumentations(getUserDocumentationsDto);
  }

  async deleteDocumentation(deleteDocumentationDto: DeleteDocumentationDto) {
    try{
      const documentation = await this.documentationService.getDocumentationById(deleteDocumentationDto.documentId);

      if(!documentation) throw new RpcException("There is no such document");
      if(documentation.userId !== deleteDocumentationDto.userId) throw new RpcException("No access");

      return this.documentationService.deleteDocumentation(deleteDocumentationDto.documentId);
    }catch(e: any){
      throw new RpcException(e);
    }
  }
  
}
