import mongoose, {Schema} from 'mongoose'

const tweetSchema = new Schema(
    {
        owner:{
            type:mongoose.Types.ObjectId,
            ref: "Owner"
        },
        content:{
            type: String
        }
    },{timestamps:true})


    export const Tweet = mongoose.model('Tweet', tweetSchema)