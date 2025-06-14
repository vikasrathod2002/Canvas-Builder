import { useState } from 'react';
import './App.css';
import CanvasControls from './components/CanvasControls';
import CanvasPreview from './components/CanvasPreview';
import RectangleForm from './components/ElementForms/RectangleForm';
import CircleForm from './components/ElementForms/CircleForm';
import TextForm from './components/ElementForms/TextForm';
import ImageForm from './components/ElementForms/ImageForm';

function App() {
  const [canvasState, setCanvasState] = useState({
    width: 800,
    height: 600,
    elements: []
  });

  const updateCanvasState = (newState) => {
    setCanvasState(newState);
  };

  return (
    <div className="app-container">
      <h1>Canvas Builder</h1>
      
      <div className="app-content">
        <div className="controls-section">
          <CanvasControls 
            canvasState={canvasState} 
            updateCanvasState={updateCanvasState} 
          />
          
          <div className="element-forms">
            <RectangleForm 
              canvasState={canvasState} 
              updateCanvasState={updateCanvasState} 
            />
            <CircleForm 
              canvasState={canvasState} 
              updateCanvasState={updateCanvasState} 
            />
            <TextForm 
              canvasState={canvasState} 
              updateCanvasState={updateCanvasState} 
            />
            <ImageForm 
              canvasState={canvasState} 
              updateCanvasState={updateCanvasState} 
            />
          </div>
        </div>
        
        <div className="preview-section">
          <CanvasPreview 
            canvasState={canvasState} 
            updateCanvasState={updateCanvasState} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;