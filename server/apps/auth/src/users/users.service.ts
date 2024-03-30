import { Injectable } from '@nestjs/common';

import { CreateUserDto, SignInUserDto, User, jwtConstants } from "@app/common"
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {

  constructor(@InjectModel('Users') private readonly usersModel: Model<User>,
                                    private jwtService: JwtService){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.usersModel({...createUserDto})
    const result = await newUser.save();
    return result;
  }

  async signInUser(signInUserDto: SignInUserDto): Promise<null | User>{
    const result = await this.usersModel.findOne({username: signInUserDto.username, password: signInUserDto.password}).exec()
    return result
  }

  async checkUniqueUsername(username: string): Promise<null | boolean>{
    const result = await this.usersModel.findOne({username: username}).exec()
    return result ? true : false;
  }

  async checkUniqueEmail(email: string): Promise<null | boolean>{
    const result = await this.usersModel.findOne({email: email}).exec()
    return result ? true : false;
  }

  async generateToken(userId: string){
    
    const payload = { sub: userId }
    return this.jwtService.signAsync(payload);

  }

  async getUserIdFromToken(token: string){

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      return payload.sub;
    } catch {
      throw new RpcException('Token is not right!');
    }

  }

  async getUserIdFromUsername(username: string){

    const result = await this.usersModel.findOne({username}).exec()
    return result?.id;

  }


}
