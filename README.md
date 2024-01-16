# 도형 그림판 프로젝트 소개
1. 그림판에 버튼을 클릭해서 원과 사각형을 그릴 수 있고, 삭제도 할 수 있다.
    - Button onClick 이벤트로 도형타입을 선택한다. : handleButtonClick
    - useState 함수를 이용하여 버튼 타입을 지정한다. : setSelectedShape
    - onMouseDown 이벤트로 그림판에 마우스를 클릭하면 도형이 그려진다. : handleBorderClick
    - 그려진 도형은 useState 함수 shapes 컴포넌트 현재 값을 저장한다. : setShapes
    - 그려진 도형을 삭제 시, setShapes에 빈값을 저장한다. : handleClearClick
2. 원의 크기와 사각형의 크기를 마우스 움직으로 조절 할 수 있다.
    - onMouseMove, onMouseUp 이벤트로 마우스의 움직임을 감지한다.
    - 마우스의 이동에 따라 임시 도형(prevShape) 에 width, height의 값을 저장한다. : handleMouseMove
    - 마우스 이동이 멈추면 해당 shapes에 도형을 저장한다. : handleMouseUp
3. 그려진 도형을 웹스토리지에 저장 및 삭제한다.
    - useEffect 함수를 통해 실시간으로 localStorage의 shapes 값을 가져오고 저장한다.
4. 도형을 선택 할 수 있다. (TODO)
5. 선택한 도형의 위치를 옮길 수 있다. (TODO)
6. 선택한 도형만 삭제 할 수 있다. (TODO)
7. 선택한 도형의 표시 순서를 바꿀 수 있다. (TODO)
8. 테스트 코드를 작성한다. (TODO)

# Getting Started with Create React App
create-react-app을 typescript 버전으로 설치.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.