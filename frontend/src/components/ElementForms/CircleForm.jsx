import { useState } from 'react';
import { addCircle } from '../../services/api';

const CircleForm = ({ canvasState, updateCanvasState }) => {
  const [circle, setCircle] = useState({
    x: 150,
    y: 150,
    radius: 50,
    color: '#00FF00'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCircle(prev => ({
      ...prev,
      [name]: name === 'color' ? value : parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCircle(circle);
      updateCanvasState(response.canvasState);
    } catch (error) {
      console.error('Error adding circle:', error);
    }
  };

  return (
    <div className="element-form">
      <h3>Circle</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>X:</label>
          <input
            type="number"
            name="x"
            value={circle.x}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Y:</label>
          <input
            type="number"
            name="y"
            value={circle.y}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Radius:</label>
          <input
            type="number"
            name="radius"
            value={circle.radius}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="color"
            name="color"
            value={circle.color}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Circle</button>
      </form>
    </div>
  );
};

export default CircleForm;