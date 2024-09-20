import express from 'express';
import {createVideoAnalytics,getAllVideoAnalytics,getVideoAnalyticsById,updateVideoAnalyticsById,deleteVideoAnalyticsById,} from '../Controller/videoanalytics.controller';

const router = express.Router();

router.post('/video-analytics', createVideoAnalytics);
router.get('/video-analytics', getAllVideoAnalytics);
router.get('/video-analytics/:id', getVideoAnalyticsById);
router.put('/video-analytics/:id', updateVideoAnalyticsById);
router.delete('/video-analytics/:id', deleteVideoAnalyticsById);

export default router;
