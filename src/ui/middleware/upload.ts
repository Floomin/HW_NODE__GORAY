import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the uploads directory
const uploadsDir = path.join(__dirname, '../../resources/uploads');

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Setting up Multer storage and file naming options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../resources/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
