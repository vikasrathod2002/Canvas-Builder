exports.validateCanvasDimensions = (width, height) => {
  if (width && (isNaN(width) || width <= 0)) {
    throw new Error('Width must be a positive number');
  }
  
  if (height && (isNaN(height) || height <= 0)) {
    throw new Error('Height must be a positive number');
  }
  
  if (width && width > 5000) {
    throw new Error('Width cannot exceed 5000px');
  }
  
  if (height && height > 5000) {
    throw new Error('Height cannot exceed 5000px');
  }
};

exports.validateElementData = (data, elementType) => {
  const { x, y } = data;
  
  // Common validations for all elements
  if (isNaN(x) || isNaN(y)) {
    throw new Error('X and Y coordinates must be numbers');
  }
  
  if (x < 0 || y < 0) {
    throw new Error('Coordinates cannot be negative');
  }
  
  // Type-specific validations
  switch (elementType) {
    case 'rectangle':
      if (isNaN(data.width) || isNaN(data.height)) {
        throw new Error('Width and height must be numbers');
      }
      if (data.width <= 0 || data.height <= 0) {
        throw new Error('Width and height must be positive numbers');
      }
      if (!data.color || typeof data.color !== 'string') {
        throw new Error('Color must be a valid string');
      }
      break;
      
    case 'circle':
      if (isNaN(data.radius)) {
        throw new Error('Radius must be a number');
      }
      if (data.radius <= 0) {
        throw new Error('Radius must be a positive number');
      }
      if (!data.color || typeof data.color !== 'string') {
        throw new Error('Color must be a valid string');
      }
      break;
      
    case 'text':
      if (!data.text || typeof data.text !== 'string') {
        throw new Error('Text must be a valid string');
      }
      if (!data.color || typeof data.color !== 'string') {
        throw new Error('Color must be a valid string');
      }
      if (data.fontSize && (isNaN(data.fontSize) || data.fontSize <= 0)) {
        throw new Error('Font size must be a positive number');
      }
      break;
      
    case 'image':
      if (isNaN(data.width) || isNaN(data.height)) {
        throw new Error('Width and height must be numbers');
      }
      if (data.width <= 0 || data.height <= 0) {
        throw new Error('Width and height must be positive numbers');
      }
      break;
  }
};