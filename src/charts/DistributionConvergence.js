import { MathJax, MathJaxContext } from 'better-react-mathjax';
import * as echarts from 'echarts';
import { React, useState, useEffect, useCallback } from 'react';
import './styles.scss';

function func(n, x) {
  const res = 1 / Math.PI;
  const res2 = Math.atan(Number(n) * x);
  const res3 = res * res2 + 0.5;
  return res3;
}

function DistributionConvergence() {
  const [nValue, setS] = useState(10);

  const generateData = useCallback((nValue) => {
    let data = [];

    for (let i = -2; i < 2; i += 0.001) {
      data.push([i, func(nValue, i)]);
    }
    return data;
  }, []);

  const changeNvalue = (e) => setS(e.target.value || 2);

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
        name: 'x',
        // min: -2.5,
        // max: 2.5,
        minorTick: {
          show: true,
          // splitNumber: 1,
        },
        minorSplitLine: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            width: '1.5',
          },
        },
      },
      yAxis: {
        name: 'y',
        // min: 0,
        // max: 1.3,
        minorTick: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            width: '1.5',
          },
        },
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          startValue: -5,
          endValue: 5,
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          startValue: -100,
          endValue: 100,
        },
      ],
      series: [
        {
          type: 'line',
          color: 'blue',
          showSymbol: false,
          // clip: true,
          data: generateData(nValue),
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [generateData, nValue]);

  const config = {
    loader: { load: ['input/asciimath'] },
  };

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span>
            <MathJaxContext config={config}>
              <MathJax>График {'`F(x)  = frac(1)(π) arctg(n x)+frac(1)(2)`'}</MathJax>
            </MathJaxContext>
          </span>
        </div>
      </div>
      <div className='chart__control'>
        <span>Параметр</span>
        <div className='valueRange'>
          <span className='chart__value'>n = {nValue}</span>
          <input
            onChange={(event) => changeNvalue(event)}
            type='range'
            min='1'
            max='100'
            step='1'
            defaultValue={10}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default DistributionConvergence;
