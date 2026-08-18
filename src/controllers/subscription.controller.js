import { ApiError } from '../utils/Apierrors.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import { apiResponse } from '../utils/Apiresponse.js'
import {Subscription} from '../models/subscription.model.js'
import mongoose from 'mongoose'
import { User } from '../models/user.model.js'

const subscribe = asyncHandler(async(req,res)=>{
    // get the data from backend
    // check data 
    // store the channel_id and user_id who is loggedIn
    // check for the channel and user exist in DB
    const {channelId} = req.params;
    if (!channelId) {
        throw new ApiError(400,'not found');
    }
    const subscriber = req.user?._id; // the one who is subscribing
    const channel = await User.findById(channelId); // from DB // who is subscribed

    if (!channel) {
        throw new ApiError(404,"Channel not found")
    }
    
    const alreadySubscribed = await Subscription.findOne({
        subscriber: req.user._id,
        channelId: channelId
    })
    
    if (alreadySubscribed) {
        throw new ApiError(409,'already Subscribed');
    }

    const subscribe = await Subscription.create({
        subscriber,
        channelId
    })

    if (!subscribe) {
        throw new ApiError(409,"went wrong!")
    }


    return res.status(200).json(
        new apiResponse(200,{subscribe},'subscribed successfully' )
    )
})

const unsubscrbe = asyncHandler(async(req,res)=>{
    const {channelId} = req.params;
    if (!channelId) {
        throw new ApiError(400,'not found');
    }
    const user = req.user?._id;

    const unsubscribed = await Subscription.findByIdAndDelete(channelId);

        if (!unsubscribed) {
        throw new ApiError(400,'you havent subscribe yet')
    }
    return res.status(200).json(200,{unsubscribed}, "unsubscribe successfully")
})

export {subscribe,unsubscrbe}