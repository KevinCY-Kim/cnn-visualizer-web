try:
    import torch
    import torch.nn as nn
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False
    print("Warning: PyTorch not available, using fallback data")

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 16, kernel_size=3, stride=1, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = None  # 나중에 forward에서 정의

    def forward(self, x):
        x = self.conv1(x)
        x = self.pool(x)
        x = x.view(x.size(0), -1)  # Flatten
        if self.fc1 is None:
            self.fc1 = nn.Linear(x.size(1), 10)
            # self.fc1를 현재 장치로 이동
            self.fc1.to(x.device)
        x = self.fc1(x)
        return x

def get_model_shapes():
    if not TORCH_AVAILABLE:
        # PyTorch가 없을 때 fallback 데이터 반환
        return [
            {"layer": "conv1", "output_shape": [1, 16, 28, 28]},
            {"layer": "pool", "output_shape": [1, 16, 14, 14]},
            {"layer": "fc1", "output_shape": [1, 10]},
        ]
    
    try:
        model = SimpleCNN()
        shapes = []
        x = torch.randn(1, 1, 28, 28)

        # conv1
        x = model.conv1(x)
        shapes.append({"layer": "conv1", "output_shape": list(x.shape)})

        # pool
        x = model.pool(x)
        shapes.append({"layer": "pool", "output_shape": list(x.shape)})

        # flatten + fc1
        x = x.view(x.size(0), -1)
        model.fc1 = nn.Linear(x.size(1), 10)
        x = model.fc1(x)
        shapes.append({"layer": "fc1", "output_shape": list(x.shape)})

        return shapes
    except Exception as e:
        print(f"Error calculating model shapes: {e}")
        # 에러 발생 시 fallback 데이터 반환
        return [
            {"layer": "conv1", "output_shape": [1, 16, 28, 28]},
            {"layer": "pool", "output_shape": [1, 16, 14, 14]},
            {"layer": "fc1", "output_shape": [1, 10]},
        ]
