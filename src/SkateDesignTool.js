
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './SkateDesignTool.css';

const SkateDesignTool = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [bootImage, setBootImage] = useState(null);
  const [frameImage, setFrameImage] = useState(null);
  const [wheelsGroup, setWheelsGroup] = useState(null);

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      height: 800,
      width: 1000,
      backgroundColor: 'white',
    });
    setCanvas(initCanvas);
    return () => {
      initCanvas.dispose();
    };
  }, []);

  const loadImage = (url, setter, options = {}) => {
    fabric.Image.fromURL(url, (img) => {
      img.scale(0.7); // Scale image to 70%
      img.set({
        left: canvas.width / 2 - img.getScaledWidth() / 2,
        top: canvas.height / 2 - img.getScaledHeight() / 2,
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
    if (wheelsGroup) canvas.remove(wheelsGroup);
    const wheelPositions = [
      { left: 180, top: 630 },
      { left: 280, top: 630 },
      { left: 380, top: 630 },
      { left: 480, top: 630 },
    ];
    const wheels = [];
    wheelPositions.forEach((pos, index) => {
      fabric.Image.fromURL(url, (img) => {
        img.set({ ...pos, scaleX: 0.35, scaleY: 0.35 });
        wheels.push(img);
        if (wheels.length === wheelPositions.length) {
          const group = new fabric.Group(wheels);
          setWheelsGroup(group);
          canvas.add(group);
          canvas.renderAll();
        }
      });
    });
  };

  const handleResize = (scale) => {
    if (canvas) {
      canvas.setZoom(scale);
      canvas.setWidth(1000 * scale);
      canvas.setHeight(800 * scale);
      canvas.renderAll();
    }
  };

  const handleLayerChange = (action) => {
    if (!canvas.getActiveObject()) return;
    const activeObject = canvas.getActiveObject();
    if (action === 'bringToFront') {
      canvas.bringToFront(activeObject);
    } else if (action === 'sendToBack') {
      canvas.sendToBack(activeObject);
    }
    canvas.renderAll();
  };

  const handleReset = () => {
    canvas.backgroundColor = 'white';
    canvas.clear();
    setBootImage(null);
    setFrameImage(null);
    setWheelsGroup(null);
    canvas.renderAll();
  };

  return (
    <div className="skate-design-tool">
      <canvas ref={canvasRef}></canvas>
      <div className="controls">
        <div className="control-section">
          <h2>Boot</h2>
          <ul>
            <li><button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/USD Aeon Basic Team 60 Skates.png`)}>USD Aeon Basic Team White</button></li>
            <li><button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/THEM SKATES X BACEMINT 909 Pink BOOT ONLY.png`)}>THEM Skates Bacethem</button></li>
            <li><button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/Them-909-Skates-SHELL-ONLY-Black.png`)}>THEM Skates Black</button></li>
          </ul>
        </div>

        <div className="control-section">
          <h2>Frame</h2>
          <ul>
            <li><button onClick={() => handleFrameChange(`${process.env.PUBLIC_URL}/images/Oysi Medium Chassis Black.png`)}>Oysi Frame</button></li>
          </ul>
        </div>

        <div className="control-section">
          <h2>Wheels</h2>
          <ul>
            <li><button onClick={() => handleWheelsChange(`${process.env.PUBLIC_URL}/images/Dead 56mm - 92A Wheels.png`)}>Dead Wheels</button></li>
          </ul>
        </div>

        <div className="control-section">
          <h2>Resize</h2>
          <ul>
            <li><button onClick={() => handleResize(0.25)}>25%</button></li>
            <li><button onClick={() => handleResize(0.5)}>50%</button></li>
            <li><button onClick={() => handleResize(0.75)}>75%</button></li>
            <li><button onClick={() => handleResize(1)}>100%</button></li>
          </ul>
        </div>

        <div className="control-section">
          <h2>Layers</h2>
          <ul>
            <li><button onClick={() => handleLayerChange('bringToFront')}>Bring to Front</button></li>
            <li><button onClick={() => handleLayerChange('sendToBack')}>Send to Back</button></li>
          </ul>
        </div>

        <div className="control-section">
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default SkateDesignTool;
