import userModel from '../models/user.js'
import Auth from '../common/auth.js'

const create = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({
                message:"User created Successfully",

            })
        }
        else{
            res.status(400).send({
                message:`User with ${req.body.email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server error",
            error: error.message

        })
    }
}


const login = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            let hashCompare = await Auth.hashCompare(req.body.password, user.password);
            if (hashCompare) {
                let token = await Auth.createToken({
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                });

                let userData = await userModel.findOne({ email: req.body.email }, { _id: 0, status: 0, createdAt: 0, email: 0, password: 0 });

                res.status(200).send({
                    message: "Login Successful",
                    userData: userData,
                    token: token 
                });
            } else {
                res.status(400).send({
                    message: "Invalid password"
                });
            }
        } else {
            res.status(400).send({
                message: `Account with ${req.body.email} does not exist!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
};


export default{
    create,
    login
}