import mongoose, { Document, Schema } from 'mongoose';
import { commentSchema } from './comment.model';  // Import your commentSchema

// Interface defining the properties of the Video document
interface IVideo extends Document {
  title: string;
  description?: string;
  videofile: string;
  thumbnail?: string;
  resolution: '480p' | '720p' | '1080p';
  views: number;
  duration: number;  // Add missing duration
  likes: number;
  dislikes: number;  // Add dislikes
  uploadDate: Date;  // Add uploadDate
  creatorId: mongoose.Types.ObjectId; // Reference to the Creator
  categoryName?: string;  // Change categoryId to categoryName (string)
  categoryId: mongoose.Types.ObjectId; 
  comments: mongoose.Types.ObjectId[]; // Array of comment IDs or embedded documents
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the Video model
const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  videofile: {
    type: String,
    trim: true,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
  resolution: {
    type: String,
    enum: ['480p', '720p', '1080p'],
    default: '720p',
  },
  views: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    // required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
   creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator', // Reference to the Creator model
    // required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    // required: true,  // Enforce that each video must have a category
  },
  comments: [commentSchema],  // Reference to comments, it can be embedded or you can use `ref` to reference Comment model
}, {
  versionKey: false, // Disable the __v version key
  timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

// Create the Video model
const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video;
