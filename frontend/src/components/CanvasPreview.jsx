import { useEffect, useRef } from 'react';
import { exportToPDF } from '../services/api';

const CanvasPreview = ({ canvasState }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvasState.width;
    canvas.height = canvasState.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvasState.elements.forEach(element => {
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
          if (element.imagePath) {
            const img = new Image();
            img.onload = function() {
              ctx.drawImage(img, element.x, element.y, element.width, element.height);
            };
            img.src = `/api/canvas/image?path=${encodeURIComponent(element.imagePath)}`;
          }
          break;
        default:
          break;
      }
    });
  }, [canvasState]);

  const handleExport = () => {
    exportToPDF();
  };

  return (
    <div className="preview-container">
      <h2>Canvas Preview</h2>
      <div className="canvas-container">
        <canvas ref={canvasRef} width={canvasState.width} height={canvasState.height} />
      </div>
      <button className="export-btn" onClick={handleExport}>Export as PDF</button>
    </div>
  );
};

export default CanvasPreview;