import React, { useState, useRef } from 'react';
import './App.css';

interface Shape {
  id: number;
  type: 'rectangle' | 'circle';
  size: number;
  top: number;
  left: number;
}

function App() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1);
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'circle' | null>(null);

  // '사각형' 또는 '원' 버튼 클릭 시 선택된 도형 타입 설정
  const handleButtonClick = (shapeType: 'rectangle' | 'circle') => {
    setSelectedShape(shapeType);
  };

  // 모든 도형 지우기
  const handleClearClick = () => {
    setShapes([]);
  };

  // 부모 div 클릭 시 해당 위치에 선택된 도형 추가
  const handleParentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedShape) {
      const parentDiv = parentRef.current;
      if (parentDiv) {
        const rect = parentDiv.getBoundingClientRect();
        const size = 10;
        const top = event.clientY - rect.top - size / 2;
        const left = event.clientX - rect.left - size / 2;

        const newShape: Shape = {
          id: idCounter,
          type: selectedShape,
          size,
          top: Math.max(0, Math.min(rect.height - size, top)),
          left: Math.max(0, Math.min(rect.width - size, left)),
        };

        setShapes([...shapes, newShape]);
        setIdCounter(idCounter + 1);
      }
    }
  };

  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <header className="App-header">
        Drawing Board
        <div className="button-box">
          <button onClick={() => handleButtonClick('rectangle')}>Box</button>
          <button onClick={() => handleButtonClick('circle')}>Circle</button>
          <button onClick={handleClearClick}>Clear</button>
        </div>
        <div className="board-box" ref={parentRef} onClick={handleParentClick}>
        {shapes.map((shape) => (
          <div
            key={shape.id}
            style={{
              width: shape.size,
              height: shape.size,
              borderRadius: shape.type === 'circle' ? '50%' : '0',
              backgroundColor: 'transparent',
              border: '1px solid #000',
              position: 'absolute',
              top: `${shape.top}px`,
              left: `${shape.left}px`,
            }}
          ></div>
        ))}
        </div>
      </header>
    </div>
  );
}

export default App;