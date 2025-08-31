import React from "react";
import ModelVisualizer from "./ModelVisualizer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🔬 CNN Model Visualizer</h1>
        <p>딥러닝 CNN 모델의 레이어 구조와 Shape을 시각화합니다</p>
      </header>
      <main>
        <ModelVisualizer />
      </main>
      <footer>
        <p>CNN 모델의 각 레이어를 클릭하여 자세한 정보를 확인하세요</p>
      </footer>
    </div>
  );
}

export default App;