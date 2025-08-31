from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

app = FastAPI(
    title="CNN Model Visualizer API",
    description="CNN 모델의 레이어 구조와 shape을 시각화하는 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CNN 모델 데이터
CNN_MODEL_DATA = {
    "layers": [
        {
            "layer": "input",
            "type": "Input",
            "output_shape": [1, 1, 28, 28],
            "description": "MNIST 이미지 입력 (배치, 채널, 높이, 너비)"
        },
        {
            "layer": "conv1",
            "type": "Conv2d",
            "output_shape": [1, 16, 28, 28],
            "description": "첫 번째 컨볼루션 레이어 (16개 필터, 3x3 커널)"
        },
        {
            "layer": "relu1",
            "type": "ReLU",
            "output_shape": [1, 16, 28, 28],
            "description": "활성화 함수"
        },
        {
            "layer": "pool1",
            "type": "MaxPool2d",
            "output_shape": [1, 16, 14, 14],
            "description": "최대 풀링 (2x2)"
        },
        {
            "layer": "conv2",
            "type": "Conv2d",
            "output_shape": [1, 32, 14, 14],
            "description": "두 번째 컨볼루션 레이어 (32개 필터)"
        },
        {
            "layer": "relu2",
            "type": "ReLU",
            "output_shape": [1, 32, 14, 14],
            "description": "활성화 함수"
        },
        {
            "layer": "pool2",
            "type": "MaxPool2d",
            "output_shape": [1, 32, 7, 7],
            "description": "최대 풀링 (2x2)"
        },
        {
            "layer": "flatten",
            "type": "Flatten",
            "output_shape": [1, 1568],
            "description": "특성 맵을 1차원으로 평탄화"
        },
        {
            "layer": "fc1",
            "type": "Linear",
            "output_shape": [1, 128],
            "description": "첫 번째 완전 연결 레이어"
        },
        {
            "layer": "relu3",
            "type": "ReLU",
            "output_shape": [1, 128],
            "description": "활성화 함수"
        },
        {
            "layer": "dropout",
            "type": "Dropout",
            "output_shape": [1, 128],
            "description": "과적합 방지"
        },
        {
            "layer": "fc2",
            "type": "Linear",
            "output_shape": [1, 10],
            "description": "출력 레이어 (10개 클래스)"
        }
    ],
    "model_info": {
        "name": "Simple CNN for MNIST",
        "total_params": "약 1.2M",
        "input_size": "28x28",
        "output_classes": 10
    }
}

@app.get("/")
async def root():
    """API 루트 엔드포인트"""
    return {
        "message": "CNN Model Visualizer API",
        "version": "1.0.0",
        "endpoints": {
            "/": "API 정보",
            "/model/shapes": "CNN 모델 레이어 정보",
            "/model/info": "모델 전체 정보",
            "/health": "상태 확인"
        }
    }

@app.get("/model/shapes")
async def get_model_shapes():
    """CNN 모델의 레이어별 shape 정보 반환"""
    return {"layers": CNN_MODEL_DATA["layers"]}

@app.get("/model/info")
async def get_model_info():
    """CNN 모델의 전체 정보 반환"""
    return CNN_MODEL_DATA

@app.get("/health")
async def health_check():
    """API 상태 확인"""
    return {"status": "healthy", "timestamp": "2024-01-01T00:00:00Z"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
