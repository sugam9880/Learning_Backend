import mongoose, {Schema} from 'mongoose'

const likeSchema = new Schema(
    {
        comment:{
            type: mongoose.Types.ObjectId,
            ref:'comment'
        },
        video:{
            type:mongoose.Types.ObjectId,
            ref:'Video'
        },
        tweet:{
            type: mongoose.Types.ObjectId,
            ref:'Tweet'
        }
    },{timestamps:true})


    export const Like = mongoose.model('Like', tweetSchema)