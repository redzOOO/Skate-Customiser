
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './SkateDesignTool.css';

const SkateDesignTool = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [bootImage, setBootImage] = useState(null);
  const [frameImage, setFrameImage] = useState(null);
  const [wheels, setWheels] = useState([]);
  const [activeObject, setActiveObject] = useState(null);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      height: 800,
      width: 1000,
      backgroundColor: 'white',
    });
    initCanvas.on('object:selected', () => {
      setActiveObject(initCanvas.getActiveObject());
    });
    initCanvas.on('selection:cleared', () => {
      setActiveObject(null);
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

  const handleWheelsChange = (url, count) => {
    wheels.forEach(wheel => canvas.remove(wheel));
    const wheelPositions = count === 1 ? 
      [{ left: canvas.width / 2 - 20, top: 630 }] : 
      [
        { left: 180, top: 630 },
        { left: 280, top: 630 },
        { left: 380, top: 630 },
        { left: 480, top: 630 },
      ];
    const newWheels = [];
    wheelPositions.forEach((pos) => {
      fabric.Image.fromURL(url, (img) => {
        img.set({ ...pos, scaleX: 0.35, scaleY: 0.35 });
        newWheels.push(img);
        canvas.add(img);
        canvas.renderAll();
      });
    });
    setWheels(newWheels);
  };

  const handleResize = (scale) => {
    if (!canvas.getActiveObject()) return;
    const activeObject = canvas.getActiveObject();
    activeObject.scale(scale).setCoords();
    canvas.renderAll();
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
    setWheels([]);
    canvas.renderAll();
  };

  return (
    <div className="skate-design-tool">
      <canvas ref={canvasRef}></canvas>
      {showControls && (
        <div className="controls">
          <div className="control-section">
            <h3>Boot</h3>
            <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/USD Aeon Basic Team 60 Skates.png`)}>USD Aeon Basic Team White</button>
            <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/THEM SKATES X BACEMINT 909 Pink BOOT ONLY.png`)}>THEM Skates Bacethem</button>
            <button onClick={() => handleBootChange(`${process.env.PUBLIC_URL}/images/Them-909-Skates-SHELL-ONLY-Black.png`)}>THEM Skates Black</button>
          </div>
          <div className="control-section">
            <h3>Frame</h3>
            <button onClick={() => handleFrameChange(`${process.env.PUBLIC_URL}/images/Oysi Medium Chassis Black.png`)}>Oysi Frame</button>
          </div>
          <div className="control-section">
            <h3>Wheels</h3>
            <button onClick={() => handleWheelsChange(`${process.env.PUBLIC_URL}/images/Dead 56mm - 92A Wheels.png`, 1)}>1 Wheel</button>
            <button onClick={() => handleWheelsChange(`${process.env.PUBLIC_URL}/images/Dead 56mm - 92A Wheels.png`, 4)}>4 Dead Wheels</button>
          </div>
          <div className="control-section">
            <h3>Resize</h3>
            <button onClick={() => handleResize(0.25)}>25%</button>
            <button onClick={() => handleResize(0.5)}>50%</button>
            <button onClick={() => handleResize(0.75)}>75%</button>
            <button onClick={() => handleResize(1)}>100%</button>
          </div>
          <div className="control-section">
            <h3>Layers</h3>
            <button onClick={() => handleLayerChange('bringToFront')}>Bring to Front</button>
            <button onClick={() => handleLayerChange('sendToBack')}>Send to Back</button>
          </div>
          <div className="control-section">
            <h3>Active Layer</h3>
            <div>{activeObject ? activeObject.type : 'None'}</div>
          </div>
          <div className="control-section">
            <button className="reset-button" onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
      <button className="toggle-controls-button" onClick={() => setShowControls(!showControls)}>
        {showControls ? 'Hide Controls' : 'Show Controls'}
      </button>
    </div>
  );
};

export default SkateDesignTool;
