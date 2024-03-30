import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { DocumentationServiceClient, 
         DOCUMENTATION_SERVICE_NAME, 
         CreateDocumentationDto, 
         USERS_SERVICE_NAME, 
         UsersServiceClient, 
         UserId, 
         DeleteDocumentationDto} from '@app/common';

import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class DocumentationService implements OnModuleInit{

  private documentaionService: DocumentationServiceClient;
  private usersService: UsersServiceClient;

  constructor(@Inject(DOCUMENTATION_SERVICE_NAME) private clientDocumentation: ClientGrpc,
              @Inject(USERS_SERVICE_NAME) private clientUsers: ClientGrpc){}

  onModuleInit() {
    this.documentaionService = this.clientDocumentation.getService<DocumentationServiceClient>(DOCUMENTATION_SERVICE_NAME);
    this.usersService = this.clientUsers.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async create(createDocumentationDto: Omit<CreateDocumentationDto, "userId">, token: string | undefined) {
    try{
      if(!token) throw new RpcException('No access');
      const userId = await firstValueFrom(this.usersService.getUserIdFromToken({token})).then((data: UserId) => data.userId);
      return this.documentaionService.createDocumetation({...createDocumentationDto, userId});
    }catch(e: any){
      throw new RpcException(e);
    }
  }

  async getUserDocumentations(username: string){
    try{
      const userId = await firstValueFrom(this.usersService.getUserIdFromUsername({username})).then((data: UserId) => data.userId);
      return this.documentaionService.getUserDocumentations({userId});
    } catch(e: any) {
      throw new RpcException(e);
    }
  }

  async delete(deleteDocumentationDto: Omit<DeleteDocumentationDto, "userId">, token: string | undefined){
    try{
      if(!token) throw new RpcException('No access');
      const userId = await firstValueFrom(this.usersService.getUserIdFromToken({token})).then((data: UserId) => data.userId);
      return this.documentaionService.deleteDocumentation({documentId: deleteDocumentationDto.documentId, userId})
                                     .pipe(catchError(error => throwError(() => new RpcException(error))));;
    } catch(e: any) {
      throw new RpcException(e);
    }
  }
  
}
