import express from 'express'
import Auth from '../common/auth.js'
import BlogController from '../controllers/blogs.js'

const router = express.Router();


router.post("/create",Auth.validate,BlogController.createBlog)
router.put("/edit/:id",Auth.validate,BlogController.editBlog)
router.get("/user",Auth.validate,BlogController.getByuserId)
router.get("/:id",Auth.validate,BlogController.BlogsById)
router.get("/",Auth.validate,Auth.adminGaurd,BlogController.getAllBlogs)
router.put('/status/:id/:status',Auth.validate,Auth.adminGaurd, BlogController.updateBlogStatus)

export default router