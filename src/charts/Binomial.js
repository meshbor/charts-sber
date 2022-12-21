import ReactEcharts from 'echarts-for-react';
import { useState, useRef } from 'react';
import { faktorial } from '../constants/faktorial';
import './styles.scss';

function log_fact(value) {
  if (value === 0) return 0;
  return faktorial[Math.floor(value)];
}
function binom(nValue, k, pValue) {
  return Math.exp(
    log_fact(nValue) -
      log_fact(k) -
      log_fact(nValue - k) +
      k * Math.log(pValue) +
      (nValue - k) * Math.log(1 - pValue)
  );
}
function generateData(nValue, pValue) {
  let data = [];
  for (let i = 0; i <= nValue; i += 1) {
    data.push([i, binom(nValue, i, pValue)]);
  }
  return data;
}

function Binomial() {
  const [nValue, setN] = useState(10);
  const [pValue, setP] = useState(0.5);

  const notNullSum = useRef(false);

  const changePvalue = (e) => setP(e.target.value || 0);
  const changeNvalue = (e) => setN(e.target.value || 0);

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
      max: nValue,
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
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      name: 'y',
      min: -0.2,
      max: pValue < 0.3 ? 1 : 0.5,
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
    // dataZoom: [
    //   {
    //     show: true,
    //     type: 'inside',
    //     filterMode: 'none',
    //     xAxisIndex: [0],
    //     startValue: -20,
    //     endValue: 20,
    //   },
    //   {
    //     show: true,
    //     type: 'inside',
    //     filterMode: 'none',
    //     yAxisIndex: [0],
    //     startValue: -20,
    //     endValue: 20,
    //   },
    // ],
    series: [
      {
        type: 'line',
        color: 'blue',
        showSymbol: false,
        clip: true,
        data: generateData(nValue, pValue),
      },
    ],
  };
  notNullSum.value = Number(pValue) + Number(nValue) !== 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'></div>
      <div className='chart__control'>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span className='chart__value'>p = {pValue} </span>
          <input
            onChange={(event) => changePvalue(event)}
            type='range'
            min='0.05'
            max='0.9'
            step='0.05'
            defaultValue='0.45'
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'>n = {nValue}</span>
          <input
            onChange={(event) => changeNvalue(event)}
            type='range'
            min='2'
            max='100'
            step='1'
            defaultValue='51'
          />
        </div>
      </div>
      <ReactEcharts
        option={options}
        style={{ width: '700px', height: '500px' }}
      ></ReactEcharts>
    </div>
  );
}

export default Binomial;
