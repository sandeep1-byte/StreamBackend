import mongoose, { Document, Schema } from "mongoose";

interface IWatchlist extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User
  videoIds: mongoose.Types.ObjectId[]; // Array of Video IDs
  createdAt: Date;
  updatedAt: Date;
}

const watchlistSchema = new Schema<IWatchlist>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoIds: [
    { type: mongoose.Schema.Types.ObjectId,
     ref: "Video" 
    }
  ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Watchlist = mongoose.model<IWatchlist>("Watchlist", watchlistSchema);
export default Watchlist;
