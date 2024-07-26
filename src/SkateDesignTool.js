
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './SkateDesignTool.css';

const SkateDesignTool = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [images, setImages] = useState([]);
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

  const loadImage = (url, name, options = {}) => {
    fabric.Image.fromURL(url, (img) => {
      img.set({
        left: canvas.width / 2 - img.width / 2,
        top: canvas.height / 2 - img.height / 2,
        ...options,
        name: name,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      setActiveObject(img);
      setImages(prevImages => [...prevImages, { name, img }]);
      canvas.renderAll();
    });
  };

  const handleBootChange = (url) => {
    loadImage(url, 'Boot');
  };

  const handleFrameChange = (url) => {
    loadImage(url, 'Frame');
  };

  const handleWheelChange = (url) => {
    const wheelPositions = [
      { left: 180, top: 630 },
      { left: 280, top: 630 },
      { left: 380, top: 630 },
      { left: 480, top: 630 },
    ];
    wheelPositions.forEach(pos => loadImage(url, 'Wheel', pos));
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

  const handleDelete = () => {
    if (!canvas.getActiveObject()) return;
    const activeObject = canvas.getActiveObject();
    canvas.remove(activeObject);
    setImages(images.filter(image => image.img !== activeObject));
    setActiveObject(null);
  };

  const handleReset = () => {
    canvas.clear();
    canvas.backgroundColor = 'white';
    setImages([]);
    setActiveObject(null);
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
            <button onClick={() => handleWheelChange(`${process.env.PUBLIC_URL}/images/Dead 56mm - 92A Wheels.png`)}>Add Dead Wheels</button>
          </div>
          <div className="control-section">
            <h3>Resize</h3>
            <button onClick={() => handleResize(0.25)}>25%</button>
            <button onClick={() => handleResize(0.5)}>50%</button>
            <button onClick={() => handleResize(0.75)}>75%</button>
            <button onClick={() => handleResize(1)}>100%</button>
          </div>
          <div className="control-section">
            <h3>Active Layer</h3>
            <div>{activeObject ? activeObject.name : 'None'}</div>
            {activeObject && (
              <div className="layer-controls">
                <button onClick={() => handleLayerChange('bringToFront')}>Bring to Front</button>
                <button onClick={() => handleLayerChange('sendToBack')}>Send to Back</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
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
