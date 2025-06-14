const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const config = require('../config/config');

exports.generatePDF = async (canvasState) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a temporary file path for the PDF
      const pdfPath = path.join(config.filePaths.temp, `canvas-export-${Date.now()}.pdf`);
      
      // Create PDF document
      const doc = new PDFDocument({ 
        size: [canvasState.width, canvasState.height],
        margin: 0
      });
      
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);
      
      // Create a canvas to draw elements
      const canvas = createCanvas(canvasState.width, canvasState.height);
      const ctx = canvas.getContext('2d');
      
      // Draw all elements on the canvas
      for (const element of canvasState.elements) {
        try {
          switch (element.type) {
            case 'rectangle':
              ctx.fillStyle = element.color;
              ctx.fillRect(element.x, element.y, element.width, element.height);
              break;
              
            case 'circle':
              ctx.fillStyle = element.color;
              ctx.beginPath();
              ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
              ctx.fill();
              break;
              
            case 'text':
              ctx.fillStyle = element.color;
              ctx.font = `${element.fontSize || 16}px Arial`;
              ctx.fillText(element.text, element.x, element.y);
              break;
              
            case 'image':
              if (fs.existsSync(element.imagePath)) {
                const img = await loadImage(element.imagePath);
                ctx.drawImage(img, element.x, element.y, element.width, element.height);
              }
              break;
          }
        } catch (elementError) {
          console.error(`Error drawing element ${element.id}:`, elementError);
          continue;
        }
      }
      
      // Add canvas to PDF
      doc.image(canvas.toBuffer(), 0, 0, { 
        width: canvasState.width, 
        height: canvasState.height 
      });
      
      doc.end();
      
      stream.on('finish', () => resolve(pdfPath));
      stream.on('error', reject);
      
    } catch (error) {
      reject(error);
    }
  });
};