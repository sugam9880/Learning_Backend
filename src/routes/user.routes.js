import {Router} from 'express'
import registerUser from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/register").post(
    upload.fields([ // middleware
        {
            name:"avatar",
            maxCount:1
        },{
            name: 'coverImg',
            maxCount:1
        }
    ]),
    registerUser)
// router.post('/register', registerUser)
console.log(registerUser);


export {router}