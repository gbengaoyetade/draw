import React, { useState } from 'react';
import { Stage, Layer, Line, } from 'react-konva';


const Draw = () => {
  const [isTouchDown, setIsTouchDown] = useState(false)
  const [lines, setLines] = useState([]);
  const [tool, setTool] = React.useState('pen');

  const handleDrawStart = (event) => {
    setIsTouchDown(true);
    const pos = event.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  }

  const handleDraw = (event) => {
    if (!isTouchDown)  return;
    
    const stage = event.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  const handleDrawEnd = (event) => {
    setIsTouchDown(false);
  }

  return (
    <section>
      <div>
      <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>

        <Stage
          width={window.innerWidth - 190}
          height={window.innerHeight - 120}
          onMouseDown={handleDrawStart}
          onTouchStart={handleDrawStart}
          onMouseMove={handleDraw}
          onTouchMove={handleDraw}
          onMouseUp={handleDrawEnd}
          
          >
          <Layer>
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
            
          </Layer>
        </Stage>
      </div>
    </section>
  );
};

export default Draw;
