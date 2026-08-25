import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return; // this line means that if the password was not changed then donot hased it again
  this.password = await bcrypt.hash(this.password, 10); //
});

// custom methods

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // it compares the password like the password that is entered by user and the hash password stored in db
};

userSchema.methods.generateAccessToken = function () {
  // jwt.sign() => it creats a jwt
  return jwt.sign(
    {
      _id: this._id, // payload
      email: this.email, // payload
      userName: this.userName, // coming from DB            // payload
      fullName: this.fullName, // payload
    },
    process.env.ACESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRSH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
