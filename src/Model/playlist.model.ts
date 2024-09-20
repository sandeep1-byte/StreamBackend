import mongoose, { Document, Schema } from "mongoose";

interface IPlaylist extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User
  name: string; // Playlist name
  videoIds: mongoose.Types.ObjectId[]; // Array of Video IDs
  createdAt: Date;
  updatedAt: Date;
}
// Example Playlist Schema (adjust if needed)
const playlistSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videoIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',  // Make sure this references the Video model
  }],
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
