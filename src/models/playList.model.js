import mongoose, {Schema} from 'mongoose'

const playlistSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:Boolean
        },
        video:{
            type:mongoose.Types.ObjectId,
            ref:'Video'
        }
    },{timestamps:true})


    export const Playlist = mongoose.model('Playlist', tweetSchema)