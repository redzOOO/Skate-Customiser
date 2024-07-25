
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './SkateDesignTool.css';

const SkateDesignTool = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [bootImage, setBootImage] = useState(null);
  const [linerImage, setLinerImage] = useState(null);
  const [frameImage, setFrameImage] = useState(null);
  const [wheelsImage, setWheelsImage] = useState(null);

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

  const loadImage = (url, setter) => {
    fabric.Image.fromURL(url, (img) => {
      img.scaleToWidth(300);
      img.scaleToHeight(300);
      img.set({ left: canvas.width / 2 - img.getScaledWidth() / 2, top: canvas.height / 2 - img.getScaledHeight() / 2 });
      setter(img);
      canvas.add(img);
      canvas.renderAll();
    });
  };

  const handleBootChange = (url) => {
    if (bootImage) canvas.remove(bootImage);
    loadImage(url, setBootImage);
  };

  const handleLinerChange = (url) => {
    if (linerImage) canvas.remove(linerImage);
    loadImage(url, setLinerImage);
  };

  const handleFrameChange = (url) => {
    if (frameImage) canvas.remove(frameImage);
    loadImage(url, setFrameImage);
  };

  const handleWheelsChange = (url) => {
    if (wheelsImage) canvas.remove(wheelsImage);
    loadImage(url, setWheelsImage);
  };

  const handleReset = () => {
    canvas.backgroundColor = 'white';
    canvas.clear();
    setBootImage(null);
    setLinerImage(null);
    setFrameImage(null);
    setWheelsImage(null);
    canvas.renderAll();
  };

  return (
    <div className="skate-design-tool">
      <canvas ref={canvasRef}></canvas>
      <div className="controls">
        <h2>Manufacturer</h2>
        <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/USD-Aeon-Team-White.webp`)}>Load USD Aeon Basic Team White</button>
        <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/Bacethem-THEM-SKATES-X-BACEMINT-909-Pink-Skates-1.webp`)}>Load THEM Skates Bacethem</button>
        
        <h2>Liner</h2>
        {/* Add liner selection buttons here */}
        
        <h2>Frame</h2>
        <button onClick={() => handleFrameChange(`${process.env.PUBLIC_URL}/images/Oysi-black-revolver-complete-3_a119027e-32d9-45f6-a63f-c89652c88bc4.webp`)}>Load Oysi Frame</button>
        
        <h2>Wheels</h2>
        {/* Add wheels selection buttons here */}

        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default SkateDesignTool;
