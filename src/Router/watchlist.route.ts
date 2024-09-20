import express from 'express';
import {getWatchlists, createWatchlist, addVideoToWatchlist, removeVideoFromWatchlist} from '../Controller/userwatchlist.controller';
import { authenticate } from '../middleware/authenticate'; // Middleware for authentication

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all watchlists for the authenticated user
router.get('/watchlists', getWatchlists);

// Create a new watchlist
router.post('/watchlists', createWatchlist);

// Add a video to a watchlist
router.post('/watchlists/:id/videos', addVideoToWatchlist);

// Remove a video from a watchlist
router.delete('/watchlists/:id/videos/:videoId', removeVideoFromWatchlist);

export default router;
