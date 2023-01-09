import * as echarts from 'echarts';
import { React, useState, useEffect } from 'react';
import './styles.scss';

function func(n, x) {
  const res = (1 / Math.PI);
  const res2 = (Math.atan(Number(n) * x))
  const res3 = res * res2 + 0.5;
  return res3;
}

function DistributionConvergence() {
  const [sValue, setS] = useState(10);
  const generateData = (sValue) => {
    let data = [];

    // eslint-disable-next-line eqeqeq
    for (let i = -2; i < 2; i += 0.001) {
      data.push([i, func(sValue, i)]);
    }
    return data;
  };


  const changeSvalue = (e) => setS(e.target.value || 2);

  useEffect(() => {
    const datat = generateData(sValue);
    console.log({ datat });
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
        min: -2.5,
        max: 2.5,
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
        min: 0,
        max: 1.3,
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
          data: generateData(sValue),
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [sValue]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span className='chart__title-name'>График </span>
        </div>
      </div>
      <div className='chart__control'>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span className='chart__value'>s = {sValue}</span>
          <input
            onChange={(event) => changeSvalue(event)}
            type='range'
            min='1'
            max='100'
            step='1'
            // defaultValue='3'
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default DistributionConvergence;
