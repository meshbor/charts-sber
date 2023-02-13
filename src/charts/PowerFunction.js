import * as echarts from 'echarts';
import { React, useState, useRef, useEffect } from 'react';
import './styles.scss';

function func(x, s) {
  return Number(Math.pow(x, s));
}

function PowerFunction({ step = 0.1 }) {
  const [sValue, setS] = useState(3);
  const generateData = (sValue) => {
    let data = [];
    for (let i = 0.01; i < 5; i += 0.01) {
      data.push([i, func(i, sValue)]);
    }
    return data;
  };
  const generateData2 = (sValue) => {
    let data2 = [];
    for (let i = -5; i < 0; i += 0.01) {
      data2.push([i, func(i, sValue)]);
    }
    return data2;
  };

  const notNullSum = useRef(false);

  const changeSvalue = (e) => setS(Number(e.target.value));

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
        min: -5,
        max: 5,
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
        min: -5,
        max: 5,
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
          clip: true,
          data: generateData(sValue),
        },
        {
          type: 'line',
          color: 'blue',
          showSymbol: false,
          clip: true,
          data: generateData2(sValue),
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [sValue]);

  notNullSum.value = Number(sValue) !== 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        {notNullSum.value ? (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = </span>
            <span className=''>
              {
                <span className='show'>
                  x<sup>{sValue !== 1 && sValue}</sup>
                </span>
              }
            </span>
            <span className=''>{' — степенная функция'}</span>
            {<sup className='show_white'>{sValue}</sup>}
          </div>
        ) : (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = 1</span>
          </div>
        )}
      </div>
      <div className='chart__control'>
        <span>Показатель степени</span>
        <div className='valueRange'>
          <span className='chart__value'>s = {sValue}</span>
          <input
            onChange={(event) => changeSvalue(event)}
            type='range'
            min='-3'
            max='3'
            step={step}
            defaultValue='3'
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default PowerFunction;
