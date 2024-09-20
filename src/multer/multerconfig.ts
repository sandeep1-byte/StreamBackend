import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Define the path to the uploads directory
const uploadPath = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create separate directories for videos and images
        const fileType = file.fieldname === 'video' ? 'videos' : 'thumbnails';
        const dir = path.join(uploadPath, fileType);

        // Ensure the specific directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to restrict file types
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/mkv', 'video/avi'];
    
    if (file.fieldname === 'video' && allowedVideoTypes.includes(file.mimetype)) {
        cb(null, true);
    } else if (file.fieldname === 'thumbnail' && allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

// Create multer upload instance
const upload = multer({ storage, fileFilter });

export default upload;
