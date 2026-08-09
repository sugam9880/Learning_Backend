import {Router} from 'express'
import {loginUser, logOutUser, registerUser} from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyjwt } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/register").post(

    upload.fields([ // middleware
        {
            name:"avatar",
            maxCount:1
        },{
            name: 'coverImage',
            maxCount:1
        }
    ]),

    registerUser)
// router.post('/register', registerUser)
// console.log("register user => ",registerUser);


router.route("/login").post(loginUser);

// secured routes

router.route('/logout').post(
    verifyjwt,
    logOutUser)

export {router}