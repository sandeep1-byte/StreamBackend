import { Request, Response } from 'express';
import VideoAnalytics from '../Model/videoanalytics.model';

// Create new video analytics
export const createVideoAnalytics = async (req: Request, res: Response) => {
  try {
    const { videoId, views, likes, comments, watchTime } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: 'VideoId is required.' });
    }

    const newAnalytics = new VideoAnalytics({
      videoId,
      views: views || 0,
      likes: likes || 0,
      comments: comments || 0,
      watchTime: watchTime || 0,
    });

    await newAnalytics.save();
    res.status(201).json(newAnalytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all video analytics
export const getAllVideoAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await VideoAnalytics.find().populate('videoId');
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get video analytics by ID
export const getVideoAnalyticsById = async (req: Request, res: Response) => {
  try {
    const analytics = await VideoAnalytics.findById(req.params.id).populate('videoId');
    if (!analytics) {
      return res.status(404).json({ message: 'Video Analytics not found' });
    }
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update video analytics by ID
export const updateVideoAnalyticsById = async (req: Request, res: Response) => {
  try {
    const { views, likes, comments, watchTime } = req.body;
    const updatedAnalytics = await VideoAnalytics.findByIdAndUpdate(
      req.params.id,
      { views, likes, comments, watchTime },
      { new: true }
    ).populate('videoId');

    if (!updatedAnalytics) {
      return res.status(404).json({ message: 'Video Analytics not found' });
    }
    res.status(200).json(updatedAnalytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete video analytics by ID
export const deleteVideoAnalyticsById = async (req: Request, res: Response) => {
  try {
    const deletedAnalytics = await VideoAnalytics.findByIdAndDelete(req.params.id);
    if (!deletedAnalytics) {
      return res.status(404).json({ message: 'Video Analytics not found' });
    }
    res.status(200).json({ message: 'Video Analytics deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
