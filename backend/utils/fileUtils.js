const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');

exports.saveUploadedFile = async (file) => {
  try {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(config.filePaths.uploads, filename);
    
    await fs.rename(file.path, filepath);
    return filepath;
  } catch (error) {
    throw new Error('Failed to save uploaded file');
  }
};

exports.cleanupFiles = async (filePaths) => {
  try {
    await Promise.all(filePaths.map(async filePath => {
      if (await fs.access(filePath).then(() => true).catch(() => false)) {
        await fs.unlink(filePath);
      }
    }));
  } catch (error) {
    console.error('Error cleaning up files:', error);
  }
};