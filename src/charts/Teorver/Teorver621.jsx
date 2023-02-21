import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import '../styles.scss';
import {
  pointsX,
  initial_distribution_pd_621,
  norm_distribution_pdf_621,
  quantile621,
  gammas,
} from './constants';

// @ya_rovikov - initiator
function Teorver621() {
  const [nValue, setGamma] = useState(0.45);

  const generateNormalDistr = useMemo(() => {
    let data = [];
    let dataX = norm_distribution_pdf_621[0];
    let dataY = norm_distribution_pdf_621[1];
    for (let i = 0; i < dataX.length; i += 1) {
      data.push([dataX[i], dataY[i]]);
    }
    return data;
  }, []);

  const generateInterval = useMemo(() => {
    const quantileIndex = gammas.findIndex((e) => e === nValue);
    const quantileValue = quantile621[quantileIndex] ?? 0;
    const res = quantileValue / 3.16227766;
    const point1 = 10.05 - res;
    const point2 = 10.05 + res;
    return [
      [point1, -0.2],
      [point2, -0.2],
    ];
  }, [nValue]);

  const generateInitialDist = useMemo(() => {
    let data = [];
    for (let i = 0; i < initial_distribution_pd_621.length; i += 1) {
      data.push([
        norm_distribution_pdf_621[0][i],
        initial_distribution_pd_621[i],
      ]);
    }
    return data;
  }, []);

  const changeNvalue = (e) => setGamma(Number(e.target.value));

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
        min: 8,
        max: 12,
        minorTick: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            width: '1',
          },
        },
      },
      yAxis: {
        // name: 'y',
        // min: -0.5,
        // max: 1.5,
        minorTick: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            width: '1',
          },
        },
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          // startValue: -5,
          // endValue: 5,
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          // yAxisIndex: [0],
          // startValue: -100,
          // endValue: 100,
        },
      ],
      series: [
        {
          type: 'line',
          color: 'green',
          showSymbol: false,
          // clip: true,
          data: generateNormalDistr,
        },
        {
          symbolSize: 10,
          data: pointsX,
          type: 'scatter',
          color: 'blue',
        },
        {
          data: generateInterval,
          type: 'line',
          color: 'red',
          showSymbol: false,
        },
        {
          data: [
            [generateInterval[0][0], -0.15],
            [generateInterval[0][0], -0.25],
          ],
          type: 'line',
          showSymbol: false,
          color: 'red',
          lineStyle: {
            width: '1',
          },
        },
        {
          data: [
            [generateInterval[1][0], -0.15],
            [generateInterval[1][0], -0.25],
          ],
          type: 'line',
          showSymbol: false,
          color: 'red',
          lineStyle: {
            width: '1',
          },
        },
        {
          // symbolSize: 10,
          showSymbol: false,
          data: [
            [10, -3],
            [10, 3],
          ],
          type: 'line',
          color: 'blue',
          lineStyle: {
            width: '1',
          },
        },
        {
          // symbolSize: 10,
          showSymbol: false,
          data: [
            [10.05, -3],
            [10.05, 3],
          ],
          type: 'line',
          color: 'green',
          lineStyle: {
            width: '1',
          },
        },
        {
          type: 'line',
          color: 'blue',
          showSymbol: false,
          // clip: true,
          data: generateInitialDist,
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [generateInitialDist, generateInterval, generateNormalDistr]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'></div>
      <div className='teor621__description' >
       <div className='teor621__inner-desc'> <div className='teor621__first' ></div> <span>  Изначальное распределение Ν(10,1)</span></div>
       <div className='teor621__inner-desc'> <div className='teor621__second' ></div><span>Распределение Ν(<span className='teor621__overline'>X</span>, 1/10)</span></div>
       <div className='teor621__inner-desc'> <div className='teor621__third-wrapper'><div className='teor621__third' ></div><span>Точки выборки</span></div></div> 
      </div>
      <div className='chart__control' style={{ top: '140px', left: '100px' }}>
        <span>Параметр</span>
        <div className='valueRange'>
          <span className='chart__value'>gamma = {nValue}</span>
          <input
            onChange={(event) => changeNvalue(event)}
            type='range'
            min='0.05'
            max='0.95'
            step='0.01'
            defaultValue={0.45}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Teorver621;
