/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "../../../../google/protobuf/empty";

//export const protobufPackage = "documentation";

export interface CreateDocumentationDto {
  name: string;
  isPrivate: boolean;
  userId: string;
}

export interface Documentation {
  id: string;
  userId: string;
  name: string;
  isPrivate: boolean;
}

export interface GetUserDocumentationsDto {
  userId: string;
}

export interface Documentations {
  documentations: Documentation[];
}

export interface DeleteDocumentationDto {
  documentId: string;
  userId: string;
}

export const DOCUMENTATION_PACKAGE_NAME = "documentation";

export interface DocumentationServiceClient {
  createDocumetation(request: CreateDocumentationDto): Observable<Documentation>;

  deleteDocumentation(request: DeleteDocumentationDto): Observable<Empty>;

  getUserDocumentations(request: GetUserDocumentationsDto): Observable<Documentations>;
}

export interface DocumentationServiceController {
  createDocumetation(
    request: CreateDocumentationDto,
  ): Promise<Documentation> | Observable<Documentation> | Documentation;

  deleteDocumentation(request: DeleteDocumentationDto): void;

  getUserDocumentations(
    request: GetUserDocumentationsDto,
  ): Promise<Documentations> | Observable<Documentations> | Documentations;
}

export function DocumentationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createDocumetation", "deleteDocumentation", "getUserDocumentations"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DocumentationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DocumentationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DOCUMENTATION_SERVICE_NAME = "DocumentationService";
