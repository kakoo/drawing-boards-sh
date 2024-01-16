import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface Shape {
  id: number;
  type: 'rectangle' | 'circle';
  top: number;
  left: number;
  width?: number;
  height?: number;
  isResizing?: boolean;
}

function App() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'circle' | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  
  const borderRef = useRef<HTMLDivElement>(null);

  // 웹스토리지에 저장되어있는 도형 정보
  useEffect(() => {
    const storedShapes = localStorage.getItem('shapes');
    if (storedShapes) {
      setShapes(JSON.parse(storedShapes));
    }
  }, []);

  // 웹스토리지에 저장하기
  useEffect(() => {
    if (shapes.length > 0) {
      localStorage.setItem('shapes', JSON.stringify(shapes));
    }
  }, [shapes]);

  // '사각형' 또는 '원' 버튼 클릭 시 선택된 도형 타입 설정
  const handleButtonClick = (shapeType: 'rectangle' | 'circle') => {
    setSelectedShape(shapeType);
  };

  // 모든 도형 지우기
  const handleClearClick = () => {
    setShapes([]);
    localStorage.removeItem('shapes');
  };

  // 그림판 div 클릭 시 해당 위치에 선택된 도형 추가
  const handleBorderClick = (event: React.MouseEvent) => {
    console.log("handleBorderClick");
    if (selectedShape) {
      const BordertDiv = borderRef.current;
      if (BordertDiv) {
        const { clientX, clientY } = event;
        const boardRect = BordertDiv.getBoundingClientRect();

        const newShape: Shape = {
          id: shapes.length + 1,
          type: selectedShape || 'rectangle',
          top: clientY - boardRect.top,
          left: clientX - boardRect.left,
          width: currentShape?.width || 0,
          height: currentShape?.height || 0,
        };

        setCurrentShape(newShape);
        setIsDrawing(true);
      }
    }
  };

  //마우스 움직임 감지
  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDrawing && currentShape) {
      const { clientX, clientY } = event;
      const boardRect = borderRef.current!.getBoundingClientRect();

      const newWidth = clientX - boardRect.left - currentShape.left;
      const newHeight = clientY - boardRect.top - currentShape.top;

      setCurrentShape((prevShape) => ({
        ...prevShape!,
        width: Math.max(0, newWidth),
        height: Math.max(0, newHeight),
      }));

    }
  };

  //마우스 동작 멈춤
  const handleMouseUp = () => {
    if (currentShape) {
      setShapes((prevShapes) => [...prevShapes, currentShape]);
    }
    
    setIsDrawing(false);
    setCurrentShape(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        Drawing Board
        <div className="button-box">
          <button onClick={() => handleButtonClick('rectangle')}>Box</button>
          <button onClick={() => handleButtonClick('circle')}>Circle</button>
          <button onClick={handleClearClick}>Clear</button>
        </div>
        <div 
          className="board-box" 
          ref={borderRef}
          onMouseDown={handleBorderClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
        {shapes.map((shape) => (
          <div
            key={shape.id}
            style={{
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              borderRadius: shape.type === 'circle' ? '50%' : '0',
              backgroundColor: 'transparent',
              border: '1px solid #000',
              position: 'absolute',
              top: `${shape.top}px`,
              left: `${shape.left}px`,
            }}
          ></div>
        ))}
        {currentShape && (
          <div
            style={{
              position: 'absolute',
              top: currentShape.top,
              left: currentShape.left,
              width: currentShape.width,
              height: currentShape.height,
              borderRadius: currentShape.type === 'circle' ? '50%' : '0',
              backgroundColor: 'transparent',
              border: '1px solid #000',
            }}
          ></div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;