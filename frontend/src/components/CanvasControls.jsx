import { useState } from 'react';
import { initializeCanvas } from '../services/api';

const CanvasControls = ({ canvasState, updateCanvasState }) => {
  const [dimensions, setDimensions] = useState({
    width: canvasState.width,
    height: canvasState.height
  });

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleInitialize = async () => {
    try {
      const response = await initializeCanvas(dimensions.width, dimensions.height);
      updateCanvasState(response.canvasState);
    } catch (error) {
      console.error('Error initializing canvas:', error);
    }
  };

  return (
    <div className="canvas-controls">
      <h2>Canvas Settings</h2>
      <div className="form-group">
        <label htmlFor="canvasWidth">Width:</label>
        <input
          type="number"
          id="canvasWidth"
          name="width"
          value={dimensions.width}
          onChange={handleDimensionChange}
          min="100"
        />
      </div>
      <div className="form-group">
        <label htmlFor="canvasHeight">Height:</label>
        <input
          type="number"
          id="canvasHeight"
          name="height"
          value={dimensions.height}
          onChange={handleDimensionChange}
          min="100"
        />
      </div>
      <button onClick={handleInitialize}>Initialize Canvas</button>
    </div>
  );
};

export default CanvasControls;