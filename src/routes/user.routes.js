import {Router} from 'express'
import {registerUser} from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/register").post(
    // (req,res,next)=>{
    //     console.log('Request reached header files');
    //     console.log("Content-Type Header:", req.headers['content-type']);
    //     next();
        
    // },
    upload.fields([ // middleware
        {
            name:"avatar",
            maxCount:1
        },{
            name: 'coverImage',
            maxCount:1
        }
    ]),
    // (req,res,next)=>{
    //     console.log("2. Request successfully passed through Multer middleware.");
    //     console.log("Populated req.files:", req.files);
    // },
    registerUser)
// router.post('/register', registerUser)
console.log("register user => ",registerUser);


export {router}