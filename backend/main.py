from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.model_utils import get_model_shapes

app = FastAPI(title="CNN Model Visualizer API", version="1.0.0")

# CORS 허용 (React 개발 서버에서 호출 가능하게)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "CNN Model Visualizer API is running!"}

@app.get("/model/shapes")
def get_model_shapes_endpoint():
    try:
        shapes = get_model_shapes()
        return {"layers": shapes}
    except Exception as e:
        return {"error": f"Failed to get model shapes: {str(e)}", "layers": []}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
