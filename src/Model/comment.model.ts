import { Schema, Document, model } from 'mongoose';

// Define an interface for the comment schema
interface IComment extends Document {
  author: Schema.Types.ObjectId;
  content: string;
  timestamp?: Date;
}

// Define the schema for comments
export const commentSchema = new Schema<IComment>({
  author: {
    type: Schema.Types.ObjectId,  // Reference to User model
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now  // Automatically sets the current date as the timestamp
  }
});

// Export the comment model
export const Comment = model<IComment>('Comment', commentSchema);
