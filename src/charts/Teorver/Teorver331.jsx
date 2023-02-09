import { Input } from 'antd';
import * as echarts from 'echarts';
import { useState, useEffect } from 'react';
import './styles.scss';

function Teorver331() {
  const [xValue, setX] = useState(4);
  const [yValue, setY] = useState(4);

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
        },
        minorSplitLine: {
          show: true,
        },
        axisLine: {
          symbol: ['none', 'arrow'],
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
          data: [
            {
              coords: [
                [0, 0],
                [xValue, yValue],
              ],
            },
            {
              coords: [
                [0, 0],
                [0, 1],
              ],
            },
            {
              coords: [
                [0, 0],
                [1, 0],
              ],
            },
          ],
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          symbol: ['none', 'arrow'],
          color: 'blue',
          lineStyle:{
            width: 2
          }
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [xValue, yValue]);


  return (
    <div className='wrapper'>
      <div className='chart__formula-description'></div>
      <div className='charts__info'>
        <div className='valueRange'>
          <span className='chart__value '>
            Компонента x{' '}
          </span>
          <Input
            onChange={(event) => setX(Number(event.target.value))}
            type='number'
            min='-20'
            max='20'
            step='0.5'
            defaultValue={4}
            className='input-teorver'
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value '>
            Компонента y{' '}
          </span>
          <Input
            onChange={(event) => setY(Number(event.target.value))}
            type='number'
            min='-20'
            max='20'
            step='0.5'
            defaultValue={4}
            className='input-teorver'
          />
        </div>
        <div className=''>
          cov(X, {xValue} X + {yValue} Y) = {xValue}
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Teorver331;
