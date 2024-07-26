
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './SkateDesignTool.css';

const SkateDesignTool = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [bootImage, setBootImage] = useState(null);
  const [frameImage, setFrameImage] = useState(null);
  const [wheels, setWheels] = useState([]);

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
    wheels.forEach(wheel => canvas.remove(wheel));
    const wheelPositions = [
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
    setWheels([]);
    canvas.renderAll();
  };

  return (
    <div className="skate-design-tool">
      <canvas ref={canvasRef}></canvas>
      <div className="controls">
        <table>
          <thead>
            <tr>
              <th>Boot</th>
              <th>Frame</th>
              <th>Wheels</th>
              <th>Resize</th>
              <th>Layers</th>
              <th>Reset</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul>
                  <li><input type="checkbox" onChange={() => handleBootChange(`${process.env.PUBLIC_URL}/images/USD Aeon Basic Team 60 Skates.png`)} />USD Aeon Basic Team White</li>
                  <li><input type="checkbox" onChange={() => handleBootChange(`${process.env.PUBLIC_URL}/images/THEM SKATES X BACEMINT 909 Pink BOOT ONLY.png`)} />THEM Skates Bacethem</li>
                  <li><input type="checkbox" onChange={() => handleBootChange(`${process.env.PUBLIC_URL}/images/Them-909-Skates-SHELL-ONLY-Black.png`)} />THEM Skates Black</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li><input type="checkbox" onChange={() => handleFrameChange(`${process.env.PUBLIC_URL}/images/Oysi Medium Chassis Black.png`)} />Oysi Frame</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li><input type="checkbox" onChange={() => handleWheelsChange(`${process.env.PUBLIC_URL}/images/Dead 56mm - 92A Wheels.png`)} />Dead Wheels</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li><button onClick={() => handleResize(0.25)}>25%</button></li>
                  <li><button onClick={() => handleResize(0.5)}>50%</button></li>
                  <li><button onClick={() => handleResize(0.75)}>75%</button></li>
                  <li><button onClick={() => handleResize(1)}>100%</button></li>
                </ul>
              </td>
              <td>
                <ul>
                  <li><button onClick={() => handleLayerChange('bringToFront')}>Bring to Front</button></li>
                  <li><button onClick={() => handleLayerChange('sendToBack')}>Send to Back</button></li>
                </ul>
              </td>
              <td>
                <button className="reset-button" onClick={handleReset}>Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkateDesignTool;
