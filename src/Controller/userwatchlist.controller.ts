import { Request, Response } from 'express';
import Watchlist from '../Model/watchlist.model';

// Get user watchlists
export const getWatchlists = async (req: Request, res: Response) => {
  try {
    // Assuming the userId is passed in the query or body instead of using req.user
    const { userId } = req.query; // or you can use req.body

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const watchlists = await Watchlist.find({ userId });
    res.json(watchlists);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create watchlist
export const createWatchlist = async (req: Request, res: Response) => {
  try {
    const { userId, videoIds } = req.body; // Now expect userId from the request body

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const watchlist = new Watchlist({ userId, videoIds });
    await watchlist.save();
    res.status(201).json(watchlist);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update watchlist
export const updateWatchlist = async (req: Request, res: Response) => {
  try {
    const watchlist = await Watchlist.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    res.json(watchlist);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Delete watchlist
export const deleteWatchlist = async (req: Request, res: Response) => {
  try {
    const watchlist = await Watchlist.findByIdAndDelete(req.params.id);

    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    res.json({ message: 'Watchlist deleted' });
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};
