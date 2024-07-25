
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './SkateDesignTool.css';

const SkateDesignTool = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [bootImage, setBootImage] = useState(null);
  const [frameImage, setFrameImage] = useState(null);
  const [wheelsImages, setWheelsImages] = useState([]);

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

  const loadImage = (url, setter, options = {}) => {
    fabric.Image.fromURL(url, (img) => {
      img.set({
        left: canvas.width / 2 - img.width / 2,
        top: canvas.height / 2 - img.height / 2,
        ...options,
      });
      setter(img);
      canvas.add(img);
      canvas.renderAll();
    });
  };

  const handleBootChange = (url) => {
    if (bootImage) canvas.remove(bootImage);
    loadImage(url, setBootImage);
  };

  const handleFrameChange = (url) => {
    if (frameImage) canvas.remove(frameImage);
    loadImage(url, setFrameImage);
  };

  const handleWheelsChange = (url) => {
    wheelsImages.forEach(img => canvas.remove(img));
    const wheelPositions = [
      { left: 180, top: 430 },
      { left: 280, top: 430 },
      { left: 380, top: 430 },
      { left: 480, top: 430 },
    ];
    const newWheels = [];
    wheelPositions.forEach((pos) => {
      loadImage(url, (img) => {
        img.set(pos);
        img.scale(0.5);
        newWheels.push(img);
        canvas.sendToBack(img);
      });
    });
    setWheelsImages(newWheels);
  };

  const handleReset = () => {
    canvas.backgroundColor = 'white';
    canvas.clear();
    setBootImage(null);
    setFrameImage(null);
    setWheelsImages([]);
    canvas.renderAll();
  };

  return (
    <div className="skate-design-tool">
      <canvas ref={canvasRef}></canvas>
      <div className="controls">
        <h2>Boot</h2>
        <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/USD Aeon Basic Team 60 Skates.png`)}>Load USD Aeon Basic Team White</button>
        <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/THEM SKATES X BACEMINT 909 Pink BOOT ONLY.png`)}>Load THEM Skates Bacethem</button>
        <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/Them-909-Skates-SHELL-ONLY-Black.png`)}>Load THEM Skates Black</button>

        <h2>Frame</h2>
        <button onClick={() => handleFrameChange(`${process.env.PUBLIC_URL}/images/Oysi Medium Chassis Black.png`)}>Load Oysi Frame</button>
        
        <h2>Wheels</h2>
        <button onClick={() => handleWheelsChange(`${process.env.PUBLIC_URL}/images/Dead 56mm - 92A Wheels.png`)}>Load Dead Wheels</button>

        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default SkateDesignTool;
