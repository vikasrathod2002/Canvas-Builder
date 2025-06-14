const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config/config');
const {
  initializeCanvas,
  addRectangle,
  addCircle,
  addText,
  addImage,
  exportToPDF,
  getCanvasState
} = require('../controllers/canvasController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: config.filePaths.uploads,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Canvas routes
router.post('/initialize', initializeCanvas);
router.post('/rectangle', addRectangle);
router.post('/circle', addCircle);
router.post('/text', addText);
router.post('/image', upload.single('image'), addImage);
router.get('/export', exportToPDF);
router.get('/state', getCanvasState);

module.exports = router;