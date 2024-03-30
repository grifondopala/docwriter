import * as mongoose from 'mongoose';

export const DocumentationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    isPrivate: {type: Boolean, required: true},
})