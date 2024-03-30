import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import { UsersServiceController, CreateUserDto, UsersServiceControllerMethods, SignInUserDto, Token, UserId, Username } from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {

  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto) {
    const usernameUnique = await this.usersService.checkUniqueUsername(createUserDto.username);
    if(usernameUnique) throw new RpcException('Username is not unique');

    const emailUnique = await this.usersService.checkUniqueEmail(createUserDto.email);
    if(emailUnique) throw new RpcException('Email is not unique');

    const user = await this.usersService.create(createUserDto);

    const token = await this.usersService.generateToken(user.id);

    return {
      token
    }
  }
  
  async signInUser(signInUserDto: SignInUserDto){
    const user = await this.usersService.signInUser(signInUserDto)
    if(!user) throw new RpcException('Username or password is not right');

    const token = await this.usersService.generateToken(user.id);

    return {
      token
    }
  }
  
  async getUserIdFromToken(token: Token){
    const userId = await this.usersService.getUserIdFromToken(token.token);
    return {
      userId
    };
  }
  
  async getUserIdFromUsername(username: Username){
    const userId = await this.usersService.getUserIdFromUsername(username.username);
    
    if(!userId) throw new RpcException('There is no user with this username');

    return {
      userId
    };
  }

}
