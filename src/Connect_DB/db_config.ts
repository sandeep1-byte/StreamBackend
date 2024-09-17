import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export default function connectDB(){
const mongoURI = process.env.CONNECTION_LINK; // MongoDB connection string
    if (mongoURI) {
        mongoose.connect(mongoURI)
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch(err => {
                console.error("Error connecting to MongoDB:", err);
                process.exit(1); // Exit process with failure
            });
    } else {
        console.error("No MongoDB connection string found in environment variables.");
        process.exit(1); // Exit process with failure
    }
}