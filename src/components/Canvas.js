import React, { useState, useContext, useEffect } from 'react';
import { Stage, Layer, Line, } from 'react-konva';
import { HotKeys } from "react-hotkeys";
import { AppContext } from '../store/context';
import DrawHeader from './DrawHeader';
import Tools from './Tools';
import VisualSettings from './VisualSettings';


const Draw = () => {
  const { state: { tool, canvas } } = useContext(AppContext);

  const [isTouchDown, setIsTouchDown] = useState(false)
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const savedDrawings = JSON.parse(localStorage.getItem('currentDrawing'));

    if (savedDrawings) {
      const savedLines = savedDrawings.children[0].children;
      setLines(savedLines)
    }
  
  }, []);

  const handleDrawStart = (event) => {
    setIsTouchDown(true);
    const pos = event.target.getStage().getPointerPosition();

    // This was structured based on how stage.JSON() structures it's value
    setLines([...lines, { attrs: { globalCompositeOperation: tool.type, points: [pos.x, pos.y], strokeWidth: tool.size } }]);
  }

  const handleDraw = (event) => {
    if (!isTouchDown)  return;
    
    const stage = event.target.getStage();

    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    
    lastLine.attrs.points = lastLine.attrs.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);    
    
    setLines(lines.concat());
    localStorage.setItem('currentDrawing', stage.toJSON())
  }

  const undoDrawing = () => {
    lines.pop();
    setLines([...lines]);
  }

  const handleDrawEnd = (event) => {
    setIsTouchDown(false);
  }

  const handlers = { UNDO: undoDrawing }
  const keyMap = { UNDO: 'command+z' }

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <section>

        <DrawHeader />
        <section className="draw-wrapper">
          <Tools />
          <section className="draw-area" style={{ background: canvas.color }}>
            <Stage
            width={(window.innerWidth - 300) * canvas.zoom}
            height={(window.innerHeight - 120) * canvas.zoom}
            onMouseDown={handleDrawStart}
            onTouchStart={handleDrawStart}
            onMouseMove={handleDraw}
            onTouchMove={handleDraw}
            onMouseUp={handleDrawEnd}
            scaleY={canvas.zoom}
            scaleX={canvas.zoom}
            opacity={canvas.opacity/100}
            >
            <Layer>
              {lines.map((line, index) => (
                <Line
                  key={index}
                  points={line.attrs.points}
                  stroke="#000"
                  strokeWidth={line.attrs.strokeWidth}
                  globalCompositeOperation={ line.attrs.globalCompositeOperation }
                />
              ))}
            </Layer>
            </Stage>
            
          </section>
          <VisualSettings />
        </section>
        
      </section>
    </HotKeys>
  );
};

export default Draw;
