import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto, SignInUserDto } from '@app/common'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).pipe(catchError(error => throwError(() => new RpcException(error))));
  }

  @Post('sign-in')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.usersService.signInUser(signInUserDto).pipe(catchError(error => throwError(() => new RpcException(error))));
  }

}
