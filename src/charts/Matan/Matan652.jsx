import { React, useState, useRef, useEffect, useMemo } from 'react';
import './styles.scss';
import * as echarts from 'echarts';

// https://t.me/ivan_matan - initiator
function Matan652() {
  const [aValue, setA] = useState(2);

  const generateData = useMemo(() => {
    let data = [];
    for (let i = -5; i <= 5; i += 0.1) {
      const res = Math.exp(i);
      data.push([i, res]);
    }
    return data;
  }, [aValue]);

  function factorial(n) {
    let counter = 1;
    for (let i = 1; i < n; i++) {
      counter = counter * i;
    }
    return counter;
  }

  const generateTaylorData = useMemo(() => {
    let data = [];
    let counter = 1;
    let k = 4;

    for (let i = -5; i <= 5; i += 0.1) {
      const denom = Math.pow(i,k)
      // res += i;
      data.push([i-1, 1+ (denom / factorial(k))]);
      counter +=1;

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
      xAxis: {
        name: 'x',
        // min: -5,
        // max: 5,
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
      yAxis: {
        name: 'y',
        min: -2,
        max: 10,
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
          data: generateData,
        },
        {
          type: 'line',
          color: 'red',
          showSymbol: false,
          clip: true,
          data: generateTaylorData,
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [aValue]);

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
                  a<sup> x</sup>
                </span>
              }
            </span>
            <span className=''>{' — показательная функция'}</span>
            {<sup className='show_white'>{aValue}</sup>}
          </div>
        ) : (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = 0</span>
          </div>
        )}
      </div>
      <div className='chart__control'>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span className='chart__value'>a = {aValue}</span>
          <input
            onChange={(event) => changeAvalue(event)}
            type='range'
            min='0.2'
            max='2'
            step='0.01'
            defaultValue='2'
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Matan652;
