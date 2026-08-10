// import { log } from 'console'
import { ApiError } from '../utils/Apierrors.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { apiResponse } from '../utils/Apiresponse.js'
import jwt from 'jsonwebtoken'
// const registerUser = asyncHandler(async(req,res)=>{ // testing
//    return res.status(200).json({
//         message:"ok"
//     })
// })
 const generateAccessAndRefreshTokens = async(userId)=>{
try {
   const user =  await User.findById(userId);
   console.log("user insdie generateAccessAndRefreshToken => getting from DB", user);       ////////////////
   
  const accessToken =  user.generateAccessToken()
  console.log("accessToken from schema=> ",accessToken);        ///////////
  
  const refreshToken =  user.generateRefreshToken()
  console.log("refresh Token from schema =>",refreshToken);         ////////////
  

  user.refreshToken = refreshToken;
 await user.save({validateBeforeSave:false}) // saving refrsh token in DB

    return({accessToken,refreshToken})
} catch (error) {
    throw new ApiError(500,'something went wrong while generating access and refresh token')
}
 }


const registerUser = asyncHandler(async(req,res)=>{
const {userName,fullName,email,password} = await req.body
console.log(req.body); ////////////////////////////////////////

console.log(userName);
console.log(fullName);
console.log(email);
console.log(password); 

 // checking we have got all the things or not
if ([userName,fullName,email,password].some( (field)=>field?.trim() == "")) {
    throw new ApiError(400,"All fields are required")    
}; 

 // finding wheather the user already exist or not. 
 const existedUser = await User.findOne({
    $or: [{userName}, {password}]
})

console.log("existedUser from DataBase",existedUser); ///////////////////// at first it will be null and again same thing is called it gets printed

if (existedUser) {
    throw new ApiError(409,'user with this username and email already exists')
}

// req.body => it has all the things that are passed but as we are using multer multer provided us the feature of .files
// and multer gives us the local file path.. like the code below. 
// console.log("files =>",req.files);

const avatarLocalPath =  req.files?.avatar[0]?.path;
console.log("avatar path getting from req.files multer",avatarLocalPath); ///////////////

const coverImagePath = req.files?.coverImage[0]?.path;
console.log("coverImage Path getting from req.files multer", coverImagePath); ///////////////


// const avatarLocalPath = await req.files && req.files.avatar && req.files.avatar[0]? req.files.avatar[0].path : null ;
// const coverImagePath = await req.files && req.files.coverImage && req.files.coverImage[0] ? req.files.coverImage[0].path :null;

if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar Image Is Required')
}
// uploading Avatar and coverImage  in cloudinary
const avatar = await uploadOnCloudinary(avatarLocalPath);
console.log('Avatar response after uploading on cloudinary:',avatar); /////////////////////////////

const coverImage = await uploadOnCloudinary(coverImagePath);
console.log('coverImage response after uploading on cloudinary:',coverImage); /////////////////////////////

if(!avatar) throw new ApiError(400, 'Avatar Image Is not uploading in cloudinary and it is a compulsray field');

 const userDB = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })
 // waiting
  const userCreated_ = await User.findById(userDB._id).select(  // it is a DB query where we get data from DB
    "-password -refreshToken"
  ) 

  console.log("getting data from database but expect password and refreshtoken", userCreated_); ///////////////
  

  if(!userCreated_) throw new ApiError(500,"something went wrong while registering the user")

    return res.status(201).json(
        new apiResponse(200,userCreated_,"user registered successfully")
    )
})

const loginUser = asyncHandler(async(req,res)=>{
const {userName,email,password} = req.body;
    if (!(userName || !email)) {
        throw new ApiError(400,"userName or email is required")
    }

  const user =  await User.findOne({ //gets the data form DataBase
        $or:[{userName}, {email}]
    }).select("-password -refreshToken");

    console.log("user from database inside login =>",user);     ///////////////
    

    if (!user) {
        throw new ApiError(404,"user doesnot exist")
    }

   const isPasswordCorrect =  await user.isPasswordCorrect(password); // bcrypt 

   if (!isPasswordCorrect) {
        throw new ApiError(401,"Entered password is incorrect")
    }

  const {accessToken,refreshToken} =  await generateAccessAndRefreshTokens(user._id); 
//   console.log(accessToken);
//   console.log(refreshToken);
  

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken"); // from DB

  console.log('getting data from DB inside login', loggedInUser); /////////////////////
  

  const options = {
    httpOnly: true,
    secure:true // after we do this we cannot modify from front end we can only modify from server
  }
  return res.status(200).cookie("accessToken", accessToken,options).cookie("refreshToken", refreshToken, options).json(
    new apiResponse(200,{
        user: loggedInUser,accessToken,refreshToken
    },"user Logged In SuccessFully")
  )

})

const logOutUser = asyncHandler(async(req,res)=>{ //deleting token
     User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined  
            }
        }
     )

      const options = {
    httpOnly: true,
    secure:true // after we do this we cannot modify from front end we can only modify from server
  }
  return res.status(200).clearCookie('accessToken',options).clearCookie('refreshToken', options).json(
    new apiResponse(200,{},'User Logged Out ')
  )

})

const refreshAccessToken = asyncHandler(async(req,res)=>{
   const incomingRefreshToken =  req.cookies?.refreshToken || req.body.refreshToken;
   if (!incomingRefreshToken) {
    throw new ApiError(401,"unauthorized request");

  const decodedRefreshToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);

 const user =  await User.findById(decodedRefreshToken._id);

 if (!user) {
    throw new ApiError(401,"invalid refresh token")
 }

 if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401,'Refresh Token is Expired ')
 }

    const options ={
        httpOnly: true,
        secure: true
    }

  const {accessToken,refreshToken} =   await generateAccessAndRefreshTokens(user._id)
    return res
    .status(200)
    .cookie('accessToken', accessToken,options)
    .cookie('refreshToken', refreshToken,options)
    .json(
        new apiResponse(200,{refreshToken,accessToken},'accessToken refreshed')
    )

   }


})

export  {registerUser,loginUser,logOutUser,refreshAccessToken}

//get user details from frontend
 