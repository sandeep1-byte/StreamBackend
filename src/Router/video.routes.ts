
import { Router } from 'express';
import {createVideo,getAllVideos,getVideoById, updateVideo,deleteVideo,getVideosByCreator} from '../Controller/video.controller';
import upload from '../multer/multerconfig';

const router = Router();

// Use the updated multer middleware to handle multiple files
router.post('/createvideo', upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), createVideo);
router.get('/allvideos', getAllVideos);
router.get('/getvideobyId/:id', getVideoById);
router.put('/updatevideos/:id', updateVideo);
router.delete('/deletevideos/:id', deleteVideo);
router.get('/getvideobycreators/:creatorId/', getVideosByCreator);

export default router;
