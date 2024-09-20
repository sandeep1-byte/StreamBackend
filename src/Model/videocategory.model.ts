import mongoose, { Document, Schema } from 'mongoose';

// Interface defining the properties of the Category document
interface ICategory extends Document {
  categoryname: string; // Name of the category
  creatorId: mongoose.Types.ObjectId; // Reference to the creator who created the category
  videoId: mongoose.Types.ObjectId; // Reference to the associated video
  createdAt: Date; // Timestamp for when the category was created
  updatedAt: Date; // Timestamp for when the category was last updated
}

// Define the schema for the Category model
const categorySchema = new Schema<ICategory>({
  categoryname: {
    type: String,
    required: true,
    trim: true, // Trims white space from the name
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
const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category; // Export the model for use in other parts of the application