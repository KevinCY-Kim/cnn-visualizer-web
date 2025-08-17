from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 허용 (React 개발 서버에서 호출 가능하게)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/model/shapes")
def get_model_shapes():
    return {
        "layers": [
            {"layer": "conv1", "output_shape": [1, 16, 28, 28]},
            {"layer": "pool", "output_shape": [1, 16, 14, 14]},
            {"layer": "fc1", "output_shape": [1, 10]},
        ]
    }
