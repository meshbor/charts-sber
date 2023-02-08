import * as echarts from 'echarts';
import { useState, useRef, useEffect } from 'react';
import './styles.scss';

function func(x, k, b) {
  let res2 = k * x;
  const res4 = Number(res2) + Number(b);
  return res4;
}
function generateData(xValue, yValue) {
  let data = [[0, 0]];
  // for (let i = -200; i <= 200; i += 0.1) {
  data.push([xValue, yValue]);
  // }
  return data;
}

function Teorver331() {
  const [xValue, setX] = useState(1);
  const [yValue, setY] = useState(0);
  const nullSum = useRef(false);

  const changexvalue = (e) => setX(e.target.value || 0);
  const changeyvalue = (e) => setY(e.target.value || 0);

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
            width: '1.5',
          },
        },
      },
      yAxis: {
        name: 'y',
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
          startValue: -20,
          endValue: 20,
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          startValue: -20,
          endValue: 20,
        },
      ],
      series: [
        {
          type: 'lines',
          color: 'blue',
          showSymbol: false,
          symbolSize: 10,
          symbolRotate: 45,
          itemStyle: {
            symbol: 'arrow',
            decal: {
              symbol: 'arrow'
            }
          },
          // symbol: 'arrow',
          // markPoint: {
          //   symbol: 'arrow',
          //   data: [
          //     {
          //       name: 'coordinate',
          //       coord: [xValue, yValue],
          //       symbol: 'arrow',
          //       symbolSize: 10,
          //       symbolRotate: Math.cos(xValue, yValue) * xValue * yValue,
          //     },
          //     // {
          //     //     name: 'coordinate',
          //     //     coord: [10, 20]
          //     // }, {
          //     //     name: 'fixed x position',
          //     //     yAxis: 10,
          //     //     x: '90%'
          //     // },

          //     // {
          //     //     name: 'screen coordinate',
          //     //     x: 100,
          //     //     y: 100
          //     // }
          //   ],
          // },
          // clip: true,
          data: generateData(xValue, yValue),
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [generateData, xValue, yValue]);

  nullSum.value = Number(xValue) === 0 && Number(yValue) === 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'></div>
      <div>
        <div className='valueRange'>
          <span className='chart__value chart__formula-description'>
            {' '}
            Компонента x{' '}
          </span>
          <input
            onChange={(event) => setX(event.target.value)}
            type='number'
            min='-20'
            max='20'
            step='0.5'
            defaultValue={1}
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value chart__formula-description'>
            {' '}
            Компонента y{' '}
          </span>
          <input
            onChange={(event) => setY(event.target.value)}
            type='number'
            min='-20'
            max='20'
            step='0.5'
            defaultValue={1}
          />
        </div>
        <div className='chart__formula-description'>
          cov(X, {xValue} X + {yValue} Y) = {xValue}
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Teorver331;
