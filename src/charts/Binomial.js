import ReactEcharts from 'echarts-for-react';
import { useState, useRef } from 'react';
import './styles.scss';


function log_fact(value) {
  if (value === 0) return 0;
  let result = 0;
  for (let i = 1; i <= value; i++) {
    result = result + Math.log(i);
  }
  return result;
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
  for (let i = 0; i <= 35; i += 1) {
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
      // min: -10,
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
        type: 'line',
        color: 'blue',
        showSymbol: false,
        clip: true,
        data: generateData(nValue, pValue),
      },
    ],
  };
  const showkValue = (value) => {
    const val = Number(value);
    if (val > 0) {
      return `${val.toFixed(1)} x`;
    } else if (val < 0) {
      return `- ${-1 * val.toFixed(1)} x`;
    }
    return '';
  };
  const showbValue = (value) => {
    const val = Number(value);
    if (!val) return '';
    if (val > 0 && !Number(pValue)) return `${val}`;
    if (val > 0) {
      return ` + ${val.toFixed(1)} `;
    } else if (val < 0) {
      return ` - ${-1 * val.toFixed(1)} `;
    }
    return '';
  };
  notNullSum.value = Number(pValue) + Number(nValue) !== 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        {/* {notNullSum.value ? (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = </span>
            <span>{showkValue(pValue)}</span>
            <span>{showbValue(nValue)}</span>
            <span className=''>{' — прямая'}</span>
          </div>
        ) : (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = 0 - прямая</span>
          </div>
        )} */}
      </div>
      <div className='chart__control'>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span className='chart__value'>p = {pValue} </span>
          <input
            onChange={(event) => changePvalue(event)}
            type='range'
            min='0.01'
            max='1'
            step='0.05'
            defaultValue='0'
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'>n = {nValue}</span>
          <input
            onChange={(event) => changeNvalue(event)}
            type='range'
            min='1'
            max='100'
            step='1'
            defaultValue='6'
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
