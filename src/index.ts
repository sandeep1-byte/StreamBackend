import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './Connect_DB/db_config';
import userRouter from './Router/user.router'
// Load environment variables from .env file
import creatorRouter from './Router/creator.router'
import adminRouter from './Router/admin.router'
import videoRoutes from './Router/video.routes'
import  videoAnalyticsRoutes from './Router/videoAalytics.router'
import path from 'path';
import categoryRoutes from './Router/videoCategories.router'
config();
import videoPlayRouter from './Router/playlist.router';
import WatchlistRouter from './Router/watchlist.route';
// import RecommendationRouter from './Router/recommandation.router';
const app: Express = express();
// app.use(express.json());
let server: any = null; // Initialize server variable

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
// Serve static files from the 'public' folder

// Serve static files from the 'public' folder located outside of 'src'

app.use('/src/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/user", userRouter);

app.use("/creator", creatorRouter); 

app.use("/admin", adminRouter);

app.use('/videoRoute', videoRoutes);

app.use('/videoAnalysis', videoAnalyticsRoutes);
app.use('/videoCategory', categoryRoutes);

// app.use('videoPlay', videoplayRouter);
// app.use('videowatch', watchlistRouter);
// app.use('recommendations', recommendationRouter);
// Database connection and server startup
const port = process.env.PORT; // Use environment port or default to     3002
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve video files

const startServer = async () => {
    try {
        await connectDB(); // Ensure DB is connected
        server = app.listen(port, () => {
            console.log(`Server started on port ${port}...`);
        });
    } catch (error) {
        console.log("Failed to start server:", error);    }
};
startServer();

export { startServer }; // Export functions for testing or further configuration
export default app; // Export the app itself

// Start the server on script execution
