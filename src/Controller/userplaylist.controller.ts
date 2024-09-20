import { Request, Response } from 'express';
import Playlist from '../Model/playlist.model';
import Video from '../Model/videoCreator.model';

// Get all playlists for the user
export const getPlaylists = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query; // Or you can get it from req.body if preferred

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const playlists = await Playlist.find({ userId }).populate('videoIds');
    res.json(playlists);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const { userId, name, description, videoIds } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const playlist = new Playlist({ userId, name, description, videoIds });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update a playlist
export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('videoIds');
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Delete a playlist
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json({ message: 'Playlist deleted' });
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Add a video to a playlist
export const addVideoToPlaylist = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Add video to playlist if not already added
    if (!playlist.videoIds.includes(videoId)) {
      playlist.videoIds.push(videoId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Remove a video from a playlist
export const removeVideoFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    // Remove video from playlist
    playlist.videoIds = playlist.videoIds.filter(id => id.toString() !== videoId);
    await playlist.save();

    res.json(playlist);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};
