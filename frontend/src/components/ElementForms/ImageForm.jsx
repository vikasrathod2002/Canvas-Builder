import { useState } from 'react';
import { addImage } from '../../services/api';

const ImageForm = ({ canvasState, updateCanvasState }) => {
  const [image, setImage] = useState({
    x: 200,
    y: 200,
    width: 150,
    height: 150,
    imageUrl: '',
    imageFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImage(prev => ({
      ...prev,
      [name]: name === 'imageFile' ? e.target.files[0] : parseInt(value) || value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image.imageUrl && !image.imageFile) {
      alert('Please provide either an image URL or upload a file');
      return;
    }

    try {
      const data = {
        x: image.x,
        y: image.y,
        width: image.width,
        height: image.height
      };

      if (image.imageFile) {
        data.imageFile = image.imageFile;
      } else {
        data.imageUrl = image.imageUrl;
      }

      const response = await addImage(data);
      updateCanvasState(response.canvasState);
      setImage(prev => ({ ...prev, imageUrl: '', imageFile: null }));
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  return (
    <div className="element-form">
      <h3>Image</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>X:</label>
          <input
            type="number"
            name="x"
            value={image.x}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Y:</label>
          <input
            type="number"
            name="y"
            value={image.y}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Width:</label>
          <input
            type="number"
            name="width"
            value={image.width}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <input
            type="number"
            name="height"
            value={image.height}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={image.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="form-group">
          <label>Or Upload:</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Add Image</button>
      </form>
    </div>
  );
};

export default ImageForm;