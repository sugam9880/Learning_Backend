import mongoose, {Schema} from 'mongoose'

const comment = new Schema(
    {
        message:{
            type:String,
            required: true
        },
        video:{
            type:mongoose.Types.ObjectId,
            ref:'Video'
        },
        owner:{
            type: mongoose.Types.ObjectId,
            ref:'User'
        }
    },{timestamps:true})


    export const Comment = mongoose.model('Comment', tweetSchema)