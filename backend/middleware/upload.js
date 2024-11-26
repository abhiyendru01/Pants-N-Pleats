import multer from 'multer';

// Store uploaded images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
