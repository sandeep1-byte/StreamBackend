import mongoose, { Document, Schema } from "mongoose";

interface IRecommendation extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User
  recommendedVideos: mongoose.Types.ObjectId[]; // Array of Video IDs
  createdAt: Date;
  updatedAt: Date;
}

const recommendationSchema = new Schema<IRecommendation>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recommendedVideos: [{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Video" 
    }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Recommendation = mongoose.model<IRecommendation>("Recommendation",recommendationSchema
);
export default Recommendation;
