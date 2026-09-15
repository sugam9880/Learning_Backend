import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyjwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("token says", token);

    if (!token) {
      throw new ApiError(401, "Doesn't have token!");
    }

    const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
    console.log(decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // discuss about frontend
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user; // adding new obj inside req
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export { verifyjwt };
