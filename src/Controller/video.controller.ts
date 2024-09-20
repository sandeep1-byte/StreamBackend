import { Request, Response } from 'express';
import Video from '../Model/videoCreator.model';// Adjust path as necessary
import Category from '../Model/videocategory.model';

// Define an interface for the files structure
interface MulterFile {
  [fieldname: string]: Express.Multer.File[];
}
export const createVideo = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const { title, description, creatorId, categoryName } = req.body;
    console.log('Category Name:', categoryName); // Log the category name

    const files = req.files as MulterFile;

    const videofile = files['video'] && files['video'][0] ? files['video'][0].filename : null;
    const thumbnail = files['thumbnail'] && files['thumbnail'][0] ? files['thumbnail'][0].filename : null;

    // Find the category by name
    const category: any = await Category.findOne({ categoryname: categoryName });
    console.log('Found Category:', category); // Log the found category

    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create a new Video instance
    const newVideo = new Video({
      title,
      description,
      videofile,
      thumbnail,
      creatorId,
      categoryId: category._id, // Use the found category ID
      uploadDate: new Date(),
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};


export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().populate('creatorId').populate('categoryId');
    res.status(200).json(videos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error)
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id).populate('creatorId').populate('comments.author');
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('creatorId').populate('comments.author');
    if (!updatedVideo) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(updatedVideo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  console.log("fdfgdg");
  
  console.log(req.params.id);
  
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getVideosByCreator = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find({ creatorId: req.params.creatorId }).populate('creatorId').populate('comments.author');
    res.status(200).json(videos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
