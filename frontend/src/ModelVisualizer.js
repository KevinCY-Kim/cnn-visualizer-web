import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const width = 1200;
const height = 600;

function ModelVisualizer() {
  const [layers, setLayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/model/shapes");
        setLayers(response.data.layers);
        setError(null);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setError("백엔드 서버에 연결할 수 없습니다. 가상 데이터를 사용합니다.");
        // 가상 데이터 사용
        setLayers([
          {
            layer: "input",
            type: "Input",
            output_shape: [1, 1, 28, 28],
            description: "MNIST 이미지 입력"
          },
          {
            layer: "conv1",
            type: "Conv2d",
            output_shape: [1, 16, 28, 28],
            description: "첫 번째 컨볼루션"
          },
          {
            layer: "pool1",
            type: "MaxPool2d",
            output_shape: [1, 16, 14, 14],
            description: "풀링"
          },
          {
            layer: "fc1",
            type: "Linear",
            output_shape: [1, 10],
            description: "출력 레이어"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (layers.length === 0) return;

    const svg = d3.select("#svgContainer")
                  .attr("width", width)
                  .attr("height", height);

    svg.selectAll("*").remove(); // 초기화

    // 색상 스케일
    const colorScale = d3.scaleOrdinal()
      .domain(["Input", "Conv2d", "MaxPool2d", "ReLU", "Flatten", "Linear", "Dropout"])
      .range(["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#795548", "#607D8B", "#E91E63"]);

    const xScale = d3.scaleLinear()
                     .domain([0, layers.length - 1])
                     .range([100, width - 100]);

    const yScale = d3.scaleLinear()
                     .domain([0, 1])
                     .range([100, height - 100]);

    // 배경 그리드
    svg.append("rect")
       .attr("width", width)
       .attr("height", height)
       .attr("fill", "#f8f9fa");

    // 레이어 노드
    svg.selectAll("circle")
      .data(layers)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", height / 2)
      .attr("r", 40)
      .attr("fill", d => colorScale(d.type) || "#999")
      .attr("stroke", "#333")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("r", 50).attr("opacity", 1);
        showTooltip(event, d);
      })
      .on("mouseout", function() {
        d3.select(this).attr("r", 40).attr("opacity", 0.8);
        hideTooltip();
      });

    // 레이어 이름 텍스트
    svg.selectAll("text.layer-name")
      .data(layers)
      .enter()
      .append("text")
      .attr("class", "layer-name")
      .attr("x", (d, i) => xScale(i))
      .attr("y", height / 2 + 70)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(d => d.layer);

    // 레이어 타입 텍스트
    svg.selectAll("text.layer-type")
      .data(layers)
      .enter()
      .append("text")
      .attr("class", "layer-type")
      .attr("x", (d, i) => xScale(i))
      .attr("y", height / 2 + 85)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#666")
      .text(d => d.type);

    // Shape 정보 텍스트
    svg.selectAll("text.shape-info")
      .data(layers)
      .enter()
      .append("text")
      .attr("class", "shape-info")
      .attr("x", (d, i) => xScale(i))
      .attr("y", height / 2 + 100)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#333")
      .text(d => d.output_shape.join("×"));

    // 레이어 연결선
    for (let i = 0; i < layers.length - 1; i++) {
      svg.append("line")
         .attr("x1", xScale(i) + 40)
         .attr("y1", height / 2)
         .attr("x2", xScale(i + 1) - 40)
         .attr("y2", height / 2)
         .attr("stroke", "#666")
         .attr("stroke-width", 3)
         .attr("marker-end", "url(#arrowhead)");
    }

    // 화살표 마커 정의
    svg.append("defs").append("marker")
       .attr("id", "arrowhead")
       .attr("viewBox", "0 -5 10 10")
       .attr("refX", 8)
       .attr("refY", 0)
       .attr("orient", "auto")
       .attr("markerWidth", 6)
       .attr("markerHeight", 6)
       .append("path")
       .attr("d", "M0,-5L10,0L0,5")
       .attr("fill", "#666");

    // 툴팁 div
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0,0,0,0.8)")
      .style("color", "white")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    function showTooltip(event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      
      tooltip.html(`
        <strong>${d.layer}</strong><br/>
        Type: ${d.type}<br/>
        Shape: ${d.output_shape.join(" × ")}<br/>
        ${d.description || ""}
      `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    }

    function hideTooltip() {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    }

  }, [layers]);

  if (loading) {
    return <div style={{textAlign: 'center', padding: '20px'}}>로딩 중...</div>;
  }

  return (
    <div style={{textAlign: 'center'}}>
      {error && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
          padding: '10px',
          margin: '10px',
          color: '#856404'
        }}>
          {error}
        </div>
      )}
      <svg id="svgContainer" style={{border: '1px solid #ddd', borderRadius: '5px'}}></svg>
    </div>
  );
}

export default ModelVisualizer;
