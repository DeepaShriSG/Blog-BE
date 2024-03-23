import blogModel from '../models/blogs.js'
import {Status} from '../common/utils.js'

const createBlog = async(req,res)=>{
    try {
        const {title,imageUrl,description} = req.body
        if(title && imageUrl && description){
            await blogModel.create({
                title ,
                imageUrl,
                description,
                createdBy:req.headers.userId
            })

            res.status(201).send({
                message:"Blog created, send for Approval"

            })
        }
        else{
            res.status(400).send({
                message: "Title, ImageUrl , Description required"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server error",
            error: error.message
        })
    }
}


const editBlog = async(req,res)=>{

    try {
        
        const blogId = req.params.id
        if(blogId){
            const {title,imageUrl,description} = req.body

            let blog = await blogModel.findById(blogId)
            blog.title = title,
            blog.imageUrl = imageUrl,
            blog.description = description,
            blog.status=Status.PENDING

            blog.modifiedAt = Date.now()

            await blog.save()
            
            res.status(200).send({
                message:"Blog edited successfully and sent for approval"
            })

        }

        else {
            res.status(400).send({
                message: "Invalid Id or Id not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server error",
            error: error.message
        }) 
    }
}


const getAllBlogs = async(req,res)=>{
    try {
        let blogs = await blogModel.find({},{_id:1,title:1,imageUrl:1,createdAt:1,status:1,reason:1}).sort({createdAt:1})
        res.status(200).send({
            message:"Blogs Fetched Successfully",
            blogs
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const BlogsById = async(req,res)=>{
    try {
        
        let blogId = await req.params.id
        if(blogId){
            let blog = await blogModel.findById(blogId)

            res.status(200).send({
                message:"Blogs fetched successfully",
                blog
            })
        }
        else{
            res.status(400).send({
                message:"Invalid BlogId"
            })
        }

    } catch (error) {
        res.status(500).send({
            message:"Internal Server error",
            error: error.message
        })
    }
}


const getByuserId = async(req,res)=>{
    try {
        
        let blogs = await blogModel.find({createdBy:req.headers.userId},
            {_id:1,title:1,imageUrl:1,createdAt:1,status:1}).sort({createdAt:1})
            
        res.status(200).send({
            message:"Blogs Fetched Successfully",
            blogs
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const updateBlogStatus = async(req,res)=>{
    try {
        let blogId = req.params.id
        let status = req.params.status

        if(blogId && status){
            
            const {reason} = req.body
            let blog = await blogModel.findById(blogId)

            if(status === Status.APPROVED){

                blog.status = Status.APPROVED
                blog.approvedBy = req.headers.userId
                blog.reason=""
            }

            else if(status === Status.REJECTED){
                blog.status = Status.REJECTED
                blog.approvedBy = req.headers.userId
                blog.reason= reason
            }

            else{
                blog.status = Status.PENDING
            }

            blog.modifiedAt = Date.now()
            await blog.save()

            res.status(200).send({
                message:"Blog Status Updated",
                blog:blog
            })

        }
        else{
            res.status(400).send({
                message:"Invalid BlogId"
            }) 
        }

      
    } catch (error) {
        res.status(500).send({
            message:"Internal Server error",
            error: error.message
        }) 
    }
}

export default {
    
    createBlog,
    editBlog,
    BlogsById,
    getAllBlogs,
    getByuserId,
    updateBlogStatus
    
}