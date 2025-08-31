# 🔬 CNN Model Visualizer

딥러닝 CNN 모델의 레이어 구조와 Shape을 시각화하는 웹 애플리케이션입니다.

## ✨ 주요 기능

- **CNN 모델 시각화**: 각 레이어를 색상별로 구분하여 표시
- **Shape 정보**: 각 레이어의 출력 shape 정보 표시
- **인터랙티브**: 마우스 호버 시 상세 정보 툴팁 표시
- **반응형 디자인**: 다양한 화면 크기에 대응
- **에러 핸들링**: 백엔드 연결 실패 시 가상 데이터 사용

## 🏗️ 프로젝트 구조

```
web_CNN_visualizer/
├── app.py                 # FastAPI 백엔드 서버
├── requirements.txt       # Python 의존성
├── frontend/             # React 프론트엔드
│   ├── src/
│   │   ├── App.js        # 메인 앱 컴포넌트
│   │   ├── App.css       # 스타일시트
│   │   └── ModelVisualizer.js  # CNN 시각화 컴포넌트
│   └── package.json      # Node.js 의존성
└── README.md             # 프로젝트 설명서
```

## 🚀 실행 방법

### 1. 백엔드 실행

```bash
# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python app.py
```

또는

```bash
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

### 2. 프론트엔드 실행

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

## 🌐 접속 주소

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs

## 📊 CNN 모델 구조

현재 구현된 모델은 MNIST 데이터셋을 위한 간단한 CNN입니다:

1. **Input**: 28×28 MNIST 이미지
2. **Conv2d**: 16개 필터, 3×3 커널
3. **ReLU**: 활성화 함수
4. **MaxPool2d**: 2×2 풀링
5. **Conv2d**: 32개 필터
6. **ReLU**: 활성화 함수
7. **MaxPool2d**: 2×2 풀링
8. **Flatten**: 특성 맵 평탄화
9. **Linear**: 128개 뉴런
10. **ReLU**: 활성화 함수
11. **Dropout**: 과적합 방지
12. **Linear**: 10개 클래스 출력

## 🛠️ 기술 스택

- **백엔드**: FastAPI, Python
- **프론트엔드**: React, D3.js
- **스타일링**: CSS3, 반응형 디자인
- **데이터 시각화**: D3.js

## 🔧 개발 환경 설정

### Python 환경
- Python 3.8+
- FastAPI 0.104+
- Uvicorn 0.24+

### Node.js 환경
- Node.js 16+
- npm 8+

## 📝 API 엔드포인트

- `GET /`: API 정보
- `GET /model/shapes`: CNN 모델 레이어 정보
- `GET /model/info`: 모델 전체 정보
- `GET /health`: 상태 확인

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다
3. 변경사항을 커밋합니다
4. Pull Request를 생성합니다

## �� 라이선스

MIT License
