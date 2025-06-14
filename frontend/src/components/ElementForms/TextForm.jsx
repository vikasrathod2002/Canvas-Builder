import { useState } from 'react';
import { addText } from '../../services/api';

const TextForm = ({ canvasState, updateCanvasState }) => {
  const [text, setText] = useState({
    x: 50,
    y: 50,
    text: 'Sample Text',
    color: '#000000',
    fontSize: 16
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText(prev => ({
      ...prev,
      [name]: name === 'text' || name === 'color' ? value : parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addText(text);
      updateCanvasState(response.canvasState);
    } catch (error) {
      console.error('Error adding text:', error);
    }
  };

  return (
    <div className="element-form">
      <h3>Text</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>X:</label>
          <input
            type="number"
            name="x"
            value={text.x}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Y:</label>
          <input
            type="number"
            name="y"
            value={text.y}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Text:</label>
          <input
            type="text"
            name="text"
            value={text.text}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="color"
            name="color"
            value={text.color}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Font Size:</label>
          <input
            type="number"
            name="fontSize"
            value={text.fontSize}
            onChange={handleChange}
            min="8"
          />
        </div>
        <button type="submit">Add Text</button>
      </form>
    </div>
  );
};

export default TextForm;