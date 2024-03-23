import mongoose from 'mongoose'
import {Status} from '../common/utils.js'

const blogSchema = new mongoose.Schema({

    title : {type:String,required:[true,"Title is required"]},
    imageUrl: {type:String,required:[true,"ImageURl is required"]},
    description:{type:String,required:[true,"Description is required"]},
    status:{type:String,default: Status.PENDING},
    createdBy:{type:String,required:[true,"CreatedBy is required"]},
    approvedBy:{type:String},
    modifiedAt:{type:Date},
    rejectedBy:{type:String},
    reason:{type:String,default:" "},
    createdAt:{type:Date, default:Date.now()}
},
{
  collection: "blogs",
  versionKey: false
})


const blogModel = new mongoose.model('blogs',blogSchema)

export default blogModel
