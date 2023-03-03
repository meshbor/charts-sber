import { React, useState, useRef, useEffect, useMemo } from "react";
import "./styles.scss";
import * as echarts from "echarts";

// https://t.me/ivan_matan - initiator
function Matan652() {
  const [aValue, setA] = useState(4);

  const generateData = useMemo(() => {
    let data = [];
    for (let i = -10; i <= 8; i += 0.1) {
      const res = Math.exp(i);
      data.push([i, res]);
    }
    return data;
  }, [aValue]);

  function factorial(n) {
    let counter = 1;
    for (let i = 1; i <= n; i++) {
      counter = counter * i;
    }
    return counter;
  }

  function taylorY(x, k) {
    let counter = 1;
    for (let i = 1; i <= k; i++) {
      counter = counter + Math.pow(x, i) / factorial(i);
    }
    return counter;
  }

  const generateTaylorData = useMemo(() => {
    let data = [];
    let k = aValue;
    for (let i = -10; i <= 8; i += 0.1) {
      const y = taylorY(i, k);
      data.push([i, y]);
    }
    return data;
  }, [aValue]);

  const notNullSum = useRef(false);

  const changeAvalue = (e) => setA(Number(e.target.value));

  notNullSum.value = aValue !== 0;

  useEffect(() => {
    let options = {
      animation: false,
      grid: {
        top: 40,
        left: 50,
        right: 40,
        bottom: 50,
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        name: "x",
        min: -10,
        // max: 5,
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
      yAxis: {
        name: "y",
        min: -4,
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
          startValue: -5,
          endValue: 5,
        },
        {
          show: true,
          type: "inside",
          filterMode: "none",
          yAxisIndex: [0],
          startValue: -100,
          endValue: 100,
        },
      ],
      series: [
        {
          type: "line",
          color: "blue",
          showSymbol: false,
          clip: true,
          data: generateData,
        },
        {
          type: "line",
          color: "red",
          showSymbol: false,
          clip: true,
          data: generateTaylorData,
        },
        {
          symbolSize: 10,
          showSymbol: true,
          data: [[1, Math.exp(1)]],
          type: "scatter",
          color: "blue",
        },
        {
          symbolSize: 10,
          showSymbol: true,
          data: [[1, taylorY(1, aValue)]],
          type: "scatter",
          color: "red",
        },
      ],
    };
    let chartDom = document.getElementById("echartsID");
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [aValue]);

  return (
    <div className="wrapper">
      <div className="chart__formula-description">
      <div className='teor621__description' style={{top: '40px',left: '500px'}}>
       <div className='teor621__inner-desc'> <div className='teor621__teylor'></div> <span> График многочлена Тейлора</span></div>
       <div className='teor621__inner-desc'> <div className='teor621__first' ></div><span>График экспоненты </span></div>
      </div>
        <span className="chart__title-name">
          Многочлен Тейлора для экспоненты{" "}
        </span>
      </div>
      <div style={{ left: "485px" }} className="chart__control">
        <span>Степень многочлена Тейлора</span>
        <div className="valueRange">
          <span className="chart__value">k = {aValue}</span>
          <input
            onChange={(event) => changeAvalue(event)}
            type="range"
            min="1"
            max="10"
            step="1"
            defaultValue="4"
          />
        </div>
      </div>
      <div style={{ width: "700px", height: "500px" }} id="echartsID"></div>
    </div>
  );
}

export default Matan652;
