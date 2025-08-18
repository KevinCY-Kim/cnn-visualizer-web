# CNN Visualizer Web

FastAPI 백엔드와 React/D3 프론트엔드를 이용해 **CNN(Convolutional Neural Network) 구조와 레이어 출력을 시각화**하는 프로젝트입니다.  

---

## 프로젝트 구조
```bash
web_CNN_visualizer/
├─ backend/ # FastAPI 서버
│ ├─ main.py # API 엔드포인트
│ └─ venv/ # Python 가상환경
├─ frontend/ # React/D3 시각화
│ ├─ src/
│ │ ├─ index.js # React 진입점
│ │ ├─ App.js # 최상위 컴포넌트
│ │ └─ ModelVisualizer.js # CNN 레이어 시각화
│ └─ package.json # npm 패키지 정보
└─ .gitignore # 불필요 파일 제외 설정

---

## 설치 및 실행

### 1. 백엔드(FastAPI)
```bash
cd backend
python -m venv venv          # 가상환경 생성
venv\Scripts\activate        # Windows
pip install -r requirements.txt  # FastAPI 등 패키지 설치
uvicorn main:app --reload    # 서버 실행

---

### 2. 프론트엔드(React)
```bash
cd frontend
npm install                  # d3, axios 등 패키지 설치
npm start                     # React 개발 서버 실행

---

브라우저 접속: http://localhost:3000
FastAPI에서 가져온 CNN 레이어 JSON 기반 시각화 확인 가능

---

### 3. 주요 기능
CNN 모델 레이어별 출력 Shape 시각화
레이어 간 연결선 표시
FastAPI + React/D3 실시간 연동 구조
현재는 예제 데이터 기반 하드코딩 가능, 추후 실제 학습 모델 연동 가능

---

### .gitignore
Python venv 제외: backend/venv/
Node modules 제외: frontend/node_modules/
빌드 파일 제외: frontend/build/

---

### 향후 계획
FastAPI에서 학습 중인 모델 구조 자동 가져오기
레이어별 필터/커널 시각화
사용자 입력 기반 CNN 구조 실시간 시뮬레이션

