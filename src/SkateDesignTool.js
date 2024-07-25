
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

  const loadImage = (urls) => {
    canvas.clear();
    urls.forEach(url => {
      fabric.Image.fromURL(url, (img) => {
        img.scaleToWidth(300);
        img.scaleToHeight(300);
        img.set({ left: canvas.width / 2 - img.getScaledWidth() / 2, top: canvas.height / 2 - img.getScaledHeight() / 2 });
        canvas.add(img);
      });
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

  const handleLoadUSDWhite = () => {
    loadImage([`${process.env.PUBLIC_URL}/images/usd_aeon_white_1.webp`, `${process.env.PUBLIC_URL}/images/usd_aeon_white_2.webp`]);
  };

  const handleLoadUSDYellow = () => {
    loadImage([`${process.env.PUBLIC_URL}/images/usd_aeon_yellow_1.webp`, `${process.env.PUBLIC_URL}/images/usd_aeon_yellow_2.webp`]);
  };

  return (
    <div className="skate-design-tool">
      <canvas ref={canvasRef}></canvas>
      <div className="controls">
        <h2>Manufacturer</h2>
        <button onClick={handleLoadUSDWhite}>Load USD Aeon Basic Team White</button>
        <button onClick={handleLoadUSDYellow}>Load USD Aeon Mery Munoz Pro II</button>
        <input type="color" onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default SkateDesignTool;
