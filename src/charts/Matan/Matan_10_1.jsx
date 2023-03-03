import * as echarts from "echarts";
import { React, useState, useEffect, useMemo } from "react";
import useDebounce from "../../utilites/useDebounce";
import "../styles.scss";

// @https://t.me/vnmrdvtc - initiator
function Matan_10_1() {
  const [aValue, setA] = useState(10);
  const [aValueDebounce, setADebounce] = useState(aValue);
  const [counter, setCounter] = useState(0.55);

  const generateDataLine = useMemo(() => {
    let data = [];
    for (let i = -3; i < 3; i += 0.5) {
      data.push([i, -i + 1]);
    }
    return data;
  }, []);

  const generateDataBar = useMemo(() => {
    let data = [];
    let line = [];

    let y = 1;
    let count = 0;
    const step = Number((1 / aValue).toFixed(3));
    for (let i = 0; i < 1; i += step) {
      const arr = [i, y.toFixed(3)];
      const arr2 = [i + step, y.toFixed(3)];

      data = [...data, arr, arr2];
      line = [...line, null, [i + step, 0], [i + step, y.toFixed(3)], null];
      count = count + y * step;
      y -= step;
    }
    setCounter(count.toFixed(4));
    return { data, line };
  }, [aValue]);
  const debounceValueA = useDebounce(aValueDebounce, 200);

  useEffect(() => {
    setA(Number(debounceValueA));
  }, [debounceValueA]);

  useEffect(() => {
    let options = {
      xAxis: {
        min: -0.5,
        max: 1.2,
        axisLabel: {
          show: true,
        },
      },
      yAxis: {
        min: -0.5,
        max: 1.2,
      },
      dataZoom: [
        {
          show: true,
          type: "inside",
          filterMode: "none",
          xAxisIndex: [0],
        },
        {
          show: true,
          type: "inside",
          filterMode: "none",
          yAxisIndex: [0],
        },
      ],
      series: [
        {
          type: "line",
          data: generateDataBar.data,
          showSymbol: false,
          color: "rgba(0, 0, 180, 0.4)",
          areaStyle: {},
        },
        {
          type: "line",
          data: generateDataBar.line,
          showSymbol: false,
          color: "rgba(0, 0, 180, 0.4)",
        },
        {
          data: generateDataLine,
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
  }, [aValue, generateDataBar, generateDataLine]);

  return (
    <div className="wrapper">
      <div className="chart__formula-description">
        <span style={{ position: "absolute", left: "370px", top: "70px" }}>
          Площадь методом прямоугольников = {counter}{" "}
        </span>
        <div className="chart__formula">
          {/* <MathJaxContext config={mathConfig}>
            <MathJax>График {'`y  = b + frac(a)(x)`'}</MathJax>
          </MathJaxContext> */}
        </div>
      </div>
      <div
        className="chart__control value-down"
        style={{ top: "63px", left: "111px", gap: "5px" }}
      >
        <span>Параметр n</span>
        <div className="valueRange">
          <span className="chart__value"> n = {aValue}</span>
          <input
            onChange={(event) => setADebounce(Number(event.target.value))}
            type="range"
            min="10"
            max="20"
            step="1"
            defaultValue={10}
          />
        </div>
      </div>
      <div style={{ width: "700px", height: "500px" }} id="echartsID"></div>
    </div>
  );
}

export default Matan_10_1;
