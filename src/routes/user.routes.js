import {Router} from 'express'
import {loginUser, logOutUser, registerUser,refreshAccessToken, changeCurrentPassword, getCurrUser, updateAccountDetails, updataUserAvatar, updataUserCoverImage, getUserChannelProfile, getWatchHistory} from '../controllers/user.controller.js'
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

    router.route('/logout').post(verifyjwt,logOutUser)
    router.route("/refresh-token").post(refreshAccessToken)
    router.route("/changePassword").post(verifyjwt,changeCurrentPassword)
    router.route("/getUser").get(verifyjwt,getCurrUser)
    router.route("/updataaccountDetails").patch(verifyjwt,updateAccountDetails)
    router.route("/updataAvatar").patch(verifyjwt,upload.single("avatar"),updataUserAvatar)
    router.route("/updateCoverImage").patch(verifyjwt,upload.single("coverImage"),updataUserCoverImage)
    router.route("/c/:userName").get(verifyjwt,getUserChannelProfile)
    router.route("/watcHistory").get(verifyjwt,getWatchHistory)

export {router}