import * as echarts from "echarts";
import { useState, useEffect, useMemo, useCallback } from "react";
import { MathJax, MathJaxContext } from 'better-react-mathjax';

import "./styles.scss";
import { mathConfig } from "../../constants/mathConfig";

function Matan_9_1() {
  const [yValue, setY] = useState(1);


  const generateCircle = useCallback((arg = 1) => {
    let data = [];
    let data2 = [];
    for (let i = -5; i <= 5; i = i + 0.01) {
      const c = Number(i.toFixed(2));
      const tmp = arg - c ** 2;
      const res = Math.sqrt(tmp / 2);
      data.push([c, res]);
      data2.push([c, -1 * res]);
    }
    return [...data, ...data2];
  }, []);

  const proisv = useMemo(()=> {
    const tmp = 2* Math.cos(yValue);
    const tmp2 = 4* Math.sin(yValue);
    return tmp + tmp2

  },[yValue])

  const linesData = useMemo(() => {
    return {
      first: generateCircle(1),
      sec: generateCircle(3),
      third: generateCircle(6),
      fourth: generateCircle(10),
    };
  }, [generateCircle]);

  useEffect(() => {
    let options = {
      animation: false,
      grid: {
        top: 40,
        left: 50,
        right: 40,
        bottom: 50,
      },
      xAxis: {
        name: "x",
        min: -10,
        max: 10,

        minorTick: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
        axisLine: {
          symbol: ["none", "arrow"],
          lineStyle: {
            width: "1.5",
          },
        },
      },
      yAxis: {
        name: "y",
        min: -10,
        max: 10,
        minorTick: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            width: "1.5",
          },
        },
      },
      dataZoom: [
        {
          show: true,
          type: "inside",
          filterMode: "none",
          xAxisIndex: [0],
          //   startValue: -20,
          //   endValue: 20,
        },
        {
          show: true,
          type: "inside",
          filterMode: "none",
          yAxisIndex: [0],
          //   startValue: -20,
          //   endValue: 20,
        },
      ],
      series: [
        {
          data: [
            {
              coords: [
                [6, 0],
                [6 + Math.cos(yValue), Math.sin(yValue)],
              ],
            },
            {
              coords: [
                [1, 1],
                [3, 5],
              ],
            },
          ],
          type: "lines",
          coordinateSystem: "cartesian2d",
          symbol: ["none", "arrow"],
          color: "blue",
          lineStyle: {
            width: 2,
          },
        },
        {
          data: linesData.first,
          type: "line",
          color: "red",
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
        {
          data: [
            [1.73, 0.0594],
            [1.73, -0.0594],
            null,
            [-1.73, 0.0594],
            [-1.73, -0.0594],
          ],
          type: "line",
          color: "red",
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
        {
          data: linesData.sec,
          type: "line",
          color: "red",
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
        {
          data: [
            [2.44, 0.15231545],
            [2.448, 0],
            null,
            [2.448, 0],
            [2.44, -0.15231545],
            null,
            [-2.44, 0.15231545],
            [-2.448, 0],
            null,
            [-2.448, 0],
            [-2.44, -0.15231545],
          ],
          type: "line",
          color: "red",
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
        {
          data: linesData.third,
          type: "line",
          color: "red",
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
        {
          data: linesData.fourth,
          type: "line",
          color: "red",
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
        {
            data: [
              [3.16, 0.085],
              [3.16, -0.085],
              null,
              [-3.16, 0.085],
              [-3.16, -0.085],
            ],
            type: "line",
            color: "red",
            showSymbol: false,
            lineStyle: {
              width: 2,
            },
          },
      ],
    };
    let chartDom = document.getElementById("echartsID");
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [yValue]);

  return (
    <div className="wrapper">
             <div className="chart__formula-description">
      <div className='teor621__description' style={{top: '180px',left: '100px', width: '200px', padding: '4px 8px'}}>
       <div className='teor621__inner-desc'> <div className='teor621__teylor'></div> <span> <MathJaxContext config={mathConfig}>
            <MathJax> {'`f(x) = x^2 + 2y^2`'}</MathJax>
          </MathJaxContext></span></div>
       <div className='teor621__inner-desc'> <div className='teor621__vector' ></div><span>Векторы </span></div>
       <div className='teor621__inner-desc'><span>Производная = {proisv.toFixed(3)} </span></div>
      </div></div>
      <div className="chart__formula-description"></div>
      <div
        className="chart__control value-up"
        style={{ top: "180px", gap: "5px" }}
      >
        <span>Параметр</span>
        <div className="valueRange">
          <span className="chart__value">t = {yValue} </span>
          <input
            onChange={(event) => setY(Number(event.target.value))}
            type="range"
            min="0"
            max="6.28"
            step="0.01"
            defaultValue={1}
          />
        </div>
      </div>
      <div style={{ width: "700px", height: "500px" }} id="echartsID"></div>
    </div>
  );
}

export default Matan_9_1;
