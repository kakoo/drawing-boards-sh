import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('그림판에 사각형 추가', () => {
  render(<App />);
  const board = screen.getByTestId('board-box');

  // "Box" 버튼 클릭
  const boxButton = screen.getByText('Box');
  fireEvent.click(boxButton);

  // 도형그리기
  fireEvent.mouseDown(board, { clientX: 100, clientY: 100 });
  fireEvent.mouseMove(board, { clientX: 200, clientY: 200 });
  fireEvent.mouseUp(board);

  // 생성된 사각형 확인
  const rectangle = screen.getByTestId(/shape-\d+/);
  expect(rectangle).toBeInTheDocument();

  // 생성된 도형 정보 출력
  console.log('도형 정보:', {
    id: parseInt(rectangle.getAttribute('data-testid')!.replace('shape-', ''), 10),
    type: rectangle.style.borderRadius === '50%' ? 'circle' : 'rectangle',
    top: parseInt(rectangle.style.top, 10),
    left: parseInt(rectangle.style.left, 10),
    width: parseInt(rectangle.style.width, 10),
    height: parseInt(rectangle.style.height, 10),
  });

  // 웹스토리지에 저장  
  const storedShapes = JSON.parse(localStorage.getItem('shapes') || '[]');
  expect(storedShapes).toHaveLength(1);
  expect(storedShapes[0].id).toBeDefined();
  expect(storedShapes[0].type).toBeDefined();
  expect(storedShapes[0].top).toBeDefined();
  expect(storedShapes[0].left).toBeDefined();
  expect(storedShapes[0].width).toBeDefined();
  expect(storedShapes[0].height).toBeDefined();
  expect(storedShapes[0].isSelected).toBeDefined();
  
});

test('모든도형 삭제', () => {
  localStorage.setItem('shapes', JSON.stringify([{ id: 1, type: 'rectangle', top: 10, left: 20, width: 30, height: 40, isSelected: false }]));
  render(<App />);

  fireEvent.click(screen.getByText('모든 도형 삭제'));

  expect(screen.queryByTestId(/shape-/)).not.toBeInTheDocument();

  // C웹스토리지 삭제
  const storedShapes = JSON.parse(localStorage.getItem('shapes') || '[]');
  expect(storedShapes).toHaveLength(0);
});