import express from "express";
import { getPlaylists,createPlaylist,updatePlaylist,deletePlaylist,addVideoToPlaylist,removeVideoFromPlaylist,} from "../Controller/userplaylist.controller";

const router = express.Router();

router.get("/playlists", getPlaylists);
router.post("/playlists", createPlaylist);
router.put("/playlists/:id", updatePlaylist);
router.delete("/playlists/:id", deletePlaylist);
router.post("/playlists/:id/videos", addVideoToPlaylist);
router.delete("/playlists/:id/videos/:videoId", removeVideoFromPlaylist);

export default router;
