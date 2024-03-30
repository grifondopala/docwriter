import { CreateDocumentationDto, 
         Documentation, 
         Documentations, 
         GetUserDocumentationsDto } from '@app/common';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose'

import { Model } from 'mongoose';

import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class DocumentationService {
  
    constructor(@InjectModel('Documentation') private readonly documentationModel: Model<Documentation>){}

    async create(createDocumentationDto: CreateDocumentationDto): Promise<Documentation> {
        const documentation = new this.documentationModel({...createDocumentationDto})
        const result = await documentation.save();
        return result;
    }

    async getUserDocumentations(getUserDocumentationsDto: GetUserDocumentationsDto): Promise<Documentations>{
        const result = await this.documentationModel.find({userId: getUserDocumentationsDto.userId}).exec()
        return {documentations: result}
    }

    async getDocumentationById(id: string){
        const result = await this.documentationModel.findOne({"_id": new ObjectId(id)}).exec()
        return result
    }

    async deleteDocumentation(id: string){
        this.documentationModel.deleteOne({"_id": new ObjectId(id)}).exec();
    }

}
