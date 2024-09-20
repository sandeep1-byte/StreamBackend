// import { Request, Response } from 'express';
// import Recommendation from '../models/Recommendation';
// import Video from '../models/Video';

// // Get recommendations for a user
// export const getRecommendations = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.userId;
//     const recommendation = await Recommendation.findOne({ userId }).populate('recommendedVideos');
//     if (!recommendation) return res.status(404).json({ message: 'Recommendations not found' });
    
//     // Optionally, you can implement a more complex recommendation algorithm here
//     res.json(recommendation);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
