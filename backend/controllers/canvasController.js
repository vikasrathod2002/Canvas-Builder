const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');
const { generatePDF } = require('../services/pdfService');
const { saveUploadedFile } = require('../utils/fileUtils');
const { validateCanvasDimensions, validateElementData } = require('../utils/validation');

let canvasState = {
  width: config.canvas.defaultWidth,
  height: config.canvas.defaultHeight,
  elements: []
};

exports.initializeCanvas = (req, res) => {
  try {
    const { width, height } = req.body;
    
    validateCanvasDimensions(width, height);
    
    canvasState = {
      width: width || config.canvas.defaultWidth,
      height: height || config.canvas.defaultHeight,
      elements: []
    };
    
    res.status(200).json({ 
      success: true,
      message: 'Canvas initialized successfully',
      canvasState 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.addRectangle = (req, res) => {
  try {
    const { x, y, width, height, color } = req.body;
    
    validateElementData({ x, y, width, height, color }, 'rectangle');
    
    canvasState.elements.push({
      type: 'rectangle',
      x, y, width, height, color,
      id: uuidv4()
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Rectangle added successfully',
      canvasState 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.addCircle = (req, res) => {
  try {
    const { x, y, radius, color } = req.body;
    
    validateElementData({ x, y, radius, color }, 'circle');
    
    canvasState.elements.push({
      type: 'circle',
      x, y, radius, color,
      id: uuidv4()
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Circle added successfully',
      canvasState 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.addText = (req, res) => {
  try {
    const { x, y, text, color, fontSize } = req.body;
    
    validateElementData({ x, y, text, color, fontSize }, 'text');
    
    canvasState.elements.push({
      type: 'text',
      x, y, text, color, fontSize,
      id: uuidv4()
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Text added successfully',
      canvasState 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.addImage = async (req, res) => {
  try {
    let imagePath;
    
    if (req.file) {
      imagePath = req.file.path;
    } else if (req.body.imageUrl) {
      const response = await axios.get(req.body.imageUrl, { responseType: 'arraybuffer' });
      const filename = `image_${Date.now()}.jpg`;
      imagePath = path.join(config.filePaths.uploads, filename);
      await fs.promises.writeFile(imagePath, response.data);
    } else {
      throw new Error('No image provided. Please upload a file or provide an image URL');
    }
    
    const { x, y, width, height } = req.body;
    
    validateElementData({ x, y, width, height }, 'image');
    
    canvasState.elements.push({
      type: 'image',
      x, y, width, height, imagePath,
      id: uuidv4()
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Image added successfully',
      canvasState 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.exportToPDF = async (req, res) => {
  try {
    if (canvasState.elements.length === 0) {
      throw new Error('Cannot export empty canvas. Please add elements first.');
    }
    
    const pdfPath = await generatePDF(canvasState);
    
    res.download(pdfPath, 'canvas-export.pdf', async (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        throw new Error('Error exporting PDF');
      }
      
      // Clean up the temporary PDF file
      try {
        await fs.promises.unlink(pdfPath);
      } catch (cleanupError) {
        console.error('Error cleaning up PDF file:', cleanupError);
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getCanvasState = (req, res) => {
  res.status(200).json({
    success: true,
    canvasState
  });
};