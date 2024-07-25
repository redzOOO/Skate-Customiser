
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './SkateDesignTool.css';

const SkateDesignTool = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      height: 600,
      width: 800,
      backgroundColor: 'white',
    });
    setCanvas(initCanvas);
    return () => {
      initCanvas.dispose();
    };
  }, []);

  const loadImage = (url) => {
    fabric.Image.fromURL(url, (img) => {
      img.scaleToWidth(300);
      img.scaleToHeight(300);
      img.set({ left: 250, top: 150 });
      canvas.add(img);
    });
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set('fill', color);
      canvas.renderAll();
    }
  };

  const handleLoadUSD = () => {
    canvas.clear();
    loadImage(process.env.PUBLIC_URL + '/images/usd_aeon.png');
  };

  const handleLoadRoces = () => {
    canvas.clear();
    loadImage(process.env.PUBLIC_URL + '/images/roces_m12.png');
  };

  return (
    <div className="skate-design-tool">
      <canvas ref={canvasRef}></canvas>
      <div className="controls">
        <button onClick={handleLoadUSD}>Load USD Aeon</button>
        <button onClick={handleLoadRoces}>Load Roces M12</button>
        <input type="color" onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default SkateDesignTool;
