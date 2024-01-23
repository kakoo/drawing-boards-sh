# 도형 그림판 프로젝트 화면
    https://drawing-boards.web.app/

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
4. 편집모드 추가, 선택한 도형의 위치를 옮길 수 있다.
    - 편집모드 버튼을 추가 하였다.
    - onClick 이벤트로 도형을 선택 할 수 있다. (도형 순서 변경시 사용) handleShapeClick
    - onMouseDown 이벤트로 마우스 움직임으로 선택 도형을 감지한다. handleShapeDrag
    - 편집모드 확인 후 드레그된 도형의 위치를 이동 및 웹스토리지에 저장한다. handleMouseMove
    - useRef dragStartPoint 으로 좌표값을 기억한다.
    - 마우스 움직임이 끝나면 선택 도형 setselectedMoveShape 값을 nugll 처리 한다.
5. 선택한 도형만 삭제 할 수 있다.
    - 편집모드 경우, ~~만들어진 도형에 x 표시를 누르면 동작한다.~~ 삭제 버튼을 클릭하면 삭제된다.
    - handleClearClick에 도형의 id를 전달 한다.
    - 마지막 도형을 지우면, 웹스토리지 키도 함께 삭제 한다.
    - ~~도형 개별 삭제 기능으로 id 체계도 변경. 가장 마지막 shape의 id에서 +1~~
6. 선택한 도형의 표시 순서를 바꿀 수 있다.
    - 편집모드 경우, 도형을 선택하면 도형의 색이 변하고 삭제, 맨 앞으로, 맨 뒤로 버튼이 보인다.
    - 맨 앞으로 클릭, 먼저 filter 함수로 선택 도형 제외, find 함수로 선택 도형으로 배열을 다시 저장한다. handleShapeBringToFront
    - 맨 뒤로 클릭, 먼저 find 함수로 선택 도형, filter 함수로 선택 도형 제외 하여 배열을 다시 저장한다. handleShapeSendToBack
    - 도형 개별 표시 순서 편집으로 id 체계도 변경. 가장 큰 shape의 id에서 +1
7. 테스트 코드를 작성한다. 
    - Jest 테스트 라이브러리를 사용하여 간단한 테스트 코드 작성
        - Box 버튼 클릭
        - 마우스를 그림판에 클릭, 마우스를 움직여 사각형 그리기
        - 웹스토리지에 저장
        - 삭제 버튼을 클릭하여 웹스토리지에서 도형 삭제
    - TODO 전체 기능을 단계별 테스트 코드 구현, 웹스토리지 결과값 확인. 

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
