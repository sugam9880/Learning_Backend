import mongoose,{Schema} from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscriber:{
            type: Schema.Types.ObjectId, // one who is subscribing
            ref: 'User'
        },
        channel:{
            type: Schema.Types.ObjectId, // one who is subscribed
            ref: 'User'
        }
    },{timestamps:true})


export const Subscription = mongoose.model('Subscription', subscriptionSchema)


// await Subscription.create({ 
//     subscriber: req.user._id,
//     channel: channelId
// });