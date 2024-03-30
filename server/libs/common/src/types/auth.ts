/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface Token {
  token: string;
}

export interface UserId {
  userId: string;
}

export interface Username {
  username: string;
}

export interface SignInUserDto {
  username: string;
  password: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UsersServiceClient {
  createUser(request: CreateUserDto): Observable<Token>;

  signInUser(request: SignInUserDto): Observable<Token>;

  getUserIdFromToken(request: Token): Observable<UserId>;

  getUserIdFromUsername(request: Username): Observable<UserId>;
}

export interface UsersServiceController {
  createUser(request: CreateUserDto): Promise<Token> | Observable<Token> | Token;

  signInUser(request: SignInUserDto): Promise<Token> | Observable<Token> | Token;

  getUserIdFromToken(request: Token): Promise<UserId> | Observable<UserId> | UserId;

  getUserIdFromUsername(request: Username): Promise<UserId> | Observable<UserId> | UserId;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "signInUser", "getUserIdFromToken", "getUserIdFromUsername"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
