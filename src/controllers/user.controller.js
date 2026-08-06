// import { log } from 'console'
import {asyncHandler} from '../utils/asyncHandler.js'

// const registerUser = asyncHandler(async(req,res)=>{
//    return res.status(200).json({
//         message:"ok"
//     })
// })

const registerUser = asyncHandler(async(req,res)=>{
const {userName,fullName,email,password} =  req.body
console.log("email", email)
console.log("fullName", fullName)
console.log("password", password);

    
})
export default registerUser

//get user details from frontend
 