// import multer from 'multer';
// import sanitizeFilename from 'sanitize-filename';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath;
//     // Determine the upload directory based on the mimetype
//     if (file.mimetype.startsWith('image/')) {
//       uploadPath = path.join(__dirname, '../../public/images'); // Path for images
//     } else if (file.mimetype.startsWith('audio/')) {
//       uploadPath = path.join(__dirname, '../../public/audios'); // Path for audio files
//     } else if (file.mimetype.startsWith('video/')) {
//       uploadPath = path.join(__dirname, '../../public/videos'); // Path for video files
//     } else {
//       // For unsupported file types
//       cb(new Error('Unsupported file type'), false);
//       return;
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const sanitizedFilename = sanitizeFilename(file.originalname);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
//     cb(null, sanitizedFilename + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // Accept images, audio, and video files
//   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image, audio, and video files are allowed!'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 150, // Adjust the size limit based on your requirements, here it's set to 50MB for larger video files
//   },
// });

// export default upload;