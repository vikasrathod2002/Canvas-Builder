import { useState } from 'react';
import { addRectangle } from '../../services/api';

const RectangleForm = ({ canvasState, updateCanvasState }) => {
  const [rectangle, setRectangle] = useState({
    x: 10,
    y: 10,
    width: 100,
    height: 80,
    color: '#FF0000'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRectangle(prev => ({
      ...prev,
      [name]: name === 'color' ? value : parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addRectangle(rectangle);
      updateCanvasState(response.canvasState);
    } catch (error) {
      console.error('Error adding rectangle:', error);
    }
  };

  return (
    <div className="element-form">
      <h3>Rectangle</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>X:</label>
          <input
            type="number"
            name="x"
            value={rectangle.x}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Y:</label>
          <input
            type="number"
            name="y"
            value={rectangle.y}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Width:</label>
          <input
            type="number"
            name="width"
            value={rectangle.width}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <input
            type="number"
            name="height"
            value={rectangle.height}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="color"
            name="color"
            value={rectangle.color}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Rectangle</button>
      </form>
    </div>
  );
};

export default RectangleForm;