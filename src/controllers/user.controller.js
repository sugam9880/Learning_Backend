// import { log } from 'console'
import { ApiError } from '../utils/Apierrors.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { apiResponse } from '../utils/Apiresponse.js'

// const registerUser = asyncHandler(async(req,res)=>{
//    return res.status(200).json({
//         message:"ok"
//     })
// })

const registerUser = asyncHandler(async(req,res)=>{
const {userName,fullName,email,password} =  req.body
// console.log("email", email)
// console.log("fullName", fullName)
// console.log("password", password);

if ([userName,fullName,email,password].some( (field)=>field?.trim() == "")) {
    throw new ApiError(400,"All fields are required")    
};
 // finding wheather the user already exist or not. 
 const existedUser = User.findOne({
    $or: [{userName}, {password}]
})

if (existedUser) {
    throw new ApiError(409,'user with this username and email already exists')
}


// req.body => it has all the things that are passed but as we are using multer multer provided us the feature of .files
// and multer gives us the local file path.. like the code below. 

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImagePath = req.files?.coverImage[0]?.path;

if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar Image Is Required')
}

// uploading Avatar and coverImage  in cloudinary

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImagePath);

if(!avatar) throw new ApiError(400, 'Avatar Image Is Required');

 const userDB = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

  const userCreated_ = await User.findById(User._id).select(  // waht it does? 
    "-password refreshToken"
  )

  if(!userCreated_) throw new ApiError(500,"something went wrong while registering the user")

    return res.status(201).json(
        new apiResponse(200,userCreated_,"user registered successfully")
    )


})
export default registerUser

//get user details from frontend
 