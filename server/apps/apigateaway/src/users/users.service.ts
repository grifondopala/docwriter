import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { CreateUserDto, 
         UsersServiceClient, 
         USERS_SERVICE_NAME, 
         SignInUserDto } from '@app/common';
         
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit{

  private usersService: UsersServiceClient;

  constructor(@Inject(USERS_SERVICE_NAME) private client: ClientGrpc){}

  onModuleInit() {
    this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  signInUser(signInUserDto: SignInUserDto) {
    return this.usersService.signInUser(signInUserDto);
  }

}
