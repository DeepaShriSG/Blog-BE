import express from 'express'
import userRoutes from '../routes/user.js'
import dashboardRoutes from '../routes/dashboard.js'
import blogRoutes from '../routes/blogs.js'

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send(`
    <h1 style="text-align:center">Welcome to Blog App</h1>`)
})

router.use("/user",userRoutes)
router.use("/blogs",blogRoutes)
router.use("/dashboard",dashboardRoutes)

export default router

