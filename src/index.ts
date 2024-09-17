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
config();

const app: Express = express();
let server: any = null; // Initialize server variable

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

app.use("/user", userRouter);

app.use("/creator", creatorRouter); 

app.use("/admin", adminRouter);
// Database connection and server startup
const port = process.env.PORT || 3005; // Use environment port or default to 3002

const startServer = async () => {
    try {
        await connectDB(); // Ensure DB is connected
        server = app.listen(port, () => {
            console.log(`Server started on port ${port}...`);
        });
    } catch (error) {
        console.log("Failed to start server:", error);    }
};


export { startServer }; // Export functions for testing or further configuration
export default app; // Export the app itself

// Start the server on script execution
if (require.main === module) {
    startServer();
}
