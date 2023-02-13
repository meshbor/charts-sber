import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import '../styles.scss';
import {
  pointsX,
  initial_distribution_pd_621,
  norm_distribution_pdf_621,
} from './constants';

// @ya_rovikov - initiator
function Teorver621() {
  const [nValue, setS] = useState(1);
  const [quantileValue, setQuantileValue] = useState(1.01522203);

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
    const res = quantileValue / 3.16227766;
    const point1 = 10.05 - res;
    const point2 = 10.05 + res;
    return [
      [point1, -0.5],
      [point2, -0.5],
    ];
  }, [quantileValue]);

  const generateInitialDist = useMemo(() => {
    let data = [];
    for (let i = 0; i < initial_distribution_pd_621.length; i += 1) {
      // console.log(initial_distribution_pd_621[i]);
      data.push([
        initial_distribution_pd_621[i],
        initial_distribution_pd_621[i],
      ]);
    }
    return data;
  }, []);

  const changeNvalue = (e) => setS(e.target.value);

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
        // min: -5,
        // max: 5,
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
          show: false,
        },
      },
      yAxis: {
        name: 'y',
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
          // startValue: -5,
          // endValue: 5,
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          // startValue: -100,
          // endValue: 100,
        },
      ],
      series: [
        {
          type: 'line',
          color: 'blue',
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
          // symbolSize: 10,
          data: generateInterval,
          type: 'line',
          color: 'red',
        },
        {
          // symbolSize: 10,
          showSymbol: false,
          data: [
            [10, -10],
            [10, 10],
          ],
          type: 'line',
          color: 'blue',
        },
        {
          // symbolSize: 10,
          showSymbol: false,
          data: [
            [10.5, -10],
            [10.5, 10],
          ],
          type: 'line',
          color: 'green',
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
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span>График</span>
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
            max='32'
            step='1'
            defaultValue={1}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Teorver621;
