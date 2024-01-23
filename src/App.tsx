import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface Shape {
  id: number;
  type: 'rectangle' | 'circle';
  top: number;
  left: number;
  width: number;
  height: number;
  isResizing?: boolean;
  isSelected: boolean;
}

const App: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'circle' | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedMoveShape, setselectedMoveShape] = useState<number | null>(null);
  const dragStartPoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const borderRef = useRef<HTMLDivElement>(null);
  const [editShape, seteditShape] = useState<number | null>(null);

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
    setIsEditMode(false);
    seteditShape(null);
  };

  // 도형 지우기
  const handleClearClick = (clearType: 'all' | number | null) => {
    if (clearType === 'all') { //모든 도형 지우기
      setIsEditMode(false);
      setSelectedShape(null);
      seteditShape(null);
      setShapes([]);
      localStorage.removeItem('shapes');
    } else if (clearType != null) { //개별 도형 지우기
        setSelectedShape(null);
        seteditShape(null);
        setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== clearType));
        if (shapes.length === 1) {
          localStorage.removeItem('shapes'); //마지막 도형을 지우면, 스토리지 키도 삭제 한다.
        }
    }
  };

  // 그림판 div 클릭 시 해당 위치에 선택된 도형 추가
  const handleBorderClick = (event: React.MouseEvent) => {
    if (selectedShape && !isEditMode) {
      const BordertDiv = borderRef.current;
      if (BordertDiv) {
        const { clientX, clientY } = event;
        const boardRect = BordertDiv.getBoundingClientRect();

        //개별 위치 변경 기능이 추가 되면서 id 체계도 변경. 가장 큰 shape의 id에서 +1
        const nextId = shapes.length > 0 ? Math.max(...shapes.map((shape) => shape.id)) + 1 : 1;

        const newShape: Shape = {
          id: nextId,
          type: selectedShape || 'rectangle',
          top: clientY - boardRect.top,
          left: clientX - boardRect.left,
          width: currentShape?.width || 0,
          height: currentShape?.height || 0,
          isSelected: false
        };

        setCurrentShape(newShape);
        setIsDrawing(true);
      }
    }
  };

  //마우스 움직임 감지
  const handleMouseMove = (event: React.MouseEvent) => {
    const boardRect = borderRef.current!.getBoundingClientRect();

    if (isDrawing && currentShape) {
      const { clientX, clientY } = event;

      const newWidth = clientX - boardRect.left - currentShape.left;
      const newHeight = clientY - boardRect.top - currentShape.top;

      setCurrentShape((prevShape) => ({
        ...prevShape!,
        width: Math.max(0, newWidth),
        height: Math.max(0, newHeight),
      }));
    }

    //편집 모드의 경우, 드레그된 도형의 위치를 이동한다.
    if (selectedMoveShape !== null) {
      const deltaX = event.clientX - dragStartPoint.current.x;
      const deltaY = event.clientY - dragStartPoint.current.y;      

      setShapes((prevShapes) =>
        prevShapes.map((shape) =>
        shape.id === selectedMoveShape
            ? { ...shape, 
              top: Math.max(0, Math.min(shape.top + deltaY, boardRect.height - shape.height - 2)),
              left: Math.max(0, Math.min(shape.left + deltaX, boardRect.width - shape.width - 2)),
            }
            : shape
        )
      );
      dragStartPoint.current = { x: event.clientX, y: event.clientY };
    }
  };

  //마우스 동작 멈춤
  const handleMouseUp = () => {
    if (isDrawing && currentShape) {
      setShapes((prevShapes) => [...prevShapes, currentShape]);
    }
    
    setIsDrawing(false);
    setCurrentShape(null);
    setselectedMoveShape(null);
  };

  //편집모드로 변경
  const handleEditModeToggle = () => {
    setSelectedShape(null);
    setIsEditMode(true);
  };

  //편집 모드의 경우, 만들어진 도형을 선택 할 수 있다.
  const handleShapeClick = (clickedShape: Shape) => {
    if (isEditMode) {
      console.log(clickedShape.id + "도형 선택");
      seteditShape(clickedShape.id);
    }
  };

  //편집 모드의 경우, 위치를 변경 할 도형을 드레그한다.
  const handleShapeDrag = (event: React.MouseEvent, draggedShape: Shape) => {
    const BordertDiv = borderRef.current;
    
    if (isEditMode && BordertDiv) {

      setselectedMoveShape(draggedShape.id);
      dragStartPoint.current = { x: event.clientX, y: event.clientY };
    }
  };

  //선택한 도형을 배열의 젤 끝으로.
  const handleShapeBringToFront = (id: number) => {
    setShapes((prevShapes) => [
      ...prevShapes.filter((shape) => shape.id !== id),
      prevShapes.find((shape) => shape.id === id)!,
    ]);
  };

  //선택한 도형을 배열의 젤 앞으로.
  const handleShapeSendToBack = (id: number) => {
    setShapes((prevShapes) => [
      prevShapes.find((shape) => shape.id === id)!,
      ...prevShapes.filter((shape) => shape.id !== id),
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        Drawing Board
        <div className="button-box">
          <button onClick={() => handleButtonClick('rectangle')}style={{backgroundColor: selectedShape === 'rectangle' ? '#B2B2B2' : '#EFEFEF'}}>Box</button>
          <button onClick={() => handleButtonClick('circle')} style={{backgroundColor: selectedShape === 'circle' ? '#B2B2B2' : '#EFEFEF'}}>Circle</button>
          <button onClick={() => handleClearClick('all')}>모든 도형 삭제</button>
          <button onClick={handleEditModeToggle} style={{backgroundColor: isEditMode ? '#B2B2B2' : '#EFEFEF'}}>편집모드</button>
          <div className='button-edit-box' style={{display: isEditMode && editShape ? 'inline' : 'none'}}>
            <button onClick={() => editShape ? handleClearClick(editShape) : null}>삭제</button>
            <button onClick={() => editShape ? handleShapeBringToFront(editShape) : null}>맨 앞으로</button>
            <button onClick={() => editShape ? handleShapeSendToBack(editShape) : null}>맨 뒤로</button>
          </div>
          <div style={{color: '#000', fontSize: '12px', display: isEditMode && !editShape ? 'inline' : 'none'}}>
            도형을 선택하세요
          </div>
        </div>
        <div
          data-testid="board-box"
          className="board-box" 
          ref={borderRef}
          onMouseDown={handleBorderClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
        {shapes.map((shape) => (
          <div
            key={shape.id}
            data-testid={`shape-${shape.id}`}
            onClick={() => handleShapeClick(shape)}
            onMouseDown={(e) => handleShapeDrag(e, shape)}
            style={{
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              borderRadius: shape.type === 'circle' ? '50%' : '0',
              backgroundColor: editShape === shape.id ? '#ecffaa' : 'transparent',
              border: '1px solid #000',
              position: 'absolute',
              top: `${shape.top}px`,
              left: `${shape.left}px`,
              cursor: isEditMode ? 'move' : 'auto'
            }}
          >
          </div>
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