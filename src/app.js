import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '18kb'}));
app.use( express.urlencoded({extended: true, limit:'18kb'}));
app.use(express.static("Public"));
app.use(cookieParser())

//routes
import { router } from './routes/user.routes.js';
import { commentRouter } from './routes/comment.route.js';
import { playlistRouter } from './routes/playList.route.js';
import { subscriptionRouter } from './routes/subscription.route.js';
import { videoRouter } from './routes/video.routes.js';
import { likeRouter } from './routes/like.route.js';


// routes declaration
app.use("/api/v1/users", router );
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/playlist",playlistRouter)
app.use("/api/v1/subscription",subscriptionRouter)
app.use("/api/v1/video",videoRouter)
app.use("/api/v1/like",likeRouter)

console.log("working");
// http://localhost:8000/users/registration
export { app }