import mongoose, { Document, Schema } from 'mongoose';

// Interface defining the properties of the VideoAnalytics document
interface IVideoAnalytics extends Document {
  videoId: mongoose.Types.ObjectId; // Reference to the Video
  views: number; // Number of views
  likes: number; // Number of likes
  comments: number; // Number of comments
  watchTime: number; // Total watch time in seconds
  createdAt: Date; // Timestamp for when the analytics were created
  updatedAt: Date; // Timestamp for when the analytics were last updated
}

// Define the schema for the VideoAnalytics model
const videoAnalyticsSchema = new Schema<IVideoAnalytics>({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Reference to the Video model
    required: true, // Each analytics entry must be associated with a video
  },
  views: {
    type: Number,
    default: 0, // Default value for views
  },
  likes: {
    type: Number,
    default: 0, // Default value for likes
  },
  comments: {
    type: Number,
    default: 0, // Default value for comments
  },
  watchTime: {
    type: Number,
    default: 0, // Default value for total watch time (in seconds)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date as the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the current date as the last update date
  },
}, {
  versionKey: false, // Disable the __v version key
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Automatically manage createdAt and updatedAt fields
});

// Create the model from the schema
const VideoAnalytics = mongoose.model<IVideoAnalytics>('VideoAnalytics', videoAnalyticsSchema);

export default VideoAnalytics; // Export the model for use in other parts of the application
