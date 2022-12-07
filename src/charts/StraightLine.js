import ReactEcharts from 'echarts-for-react';
import { useState, useRef } from 'react';
import './styles.scss';

function func(x, k, b) {
  let res2 = k * x;
  const res4 = Number(res2) + Number(b);
  return res4;
}
function generateData(kValue, bValue) {
  let data = [];
  for (let i = -200; i <= 200; i += 0.1) {
    data.push([i, func(i, kValue, bValue)]);
  }
  return data;
}

function StraightLine() {
  const [kValue, setK] = useState(1);
  const [bValue, setB] = useState(0);
  const notNullSum = useRef(false);

  const changekvalue = (e) => setK(e.target.value || 0);
  const changebvalue = (e) => setB(e.target.value || 0);

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
      min: -100,
      max: 100,
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
        data: generateData(kValue, bValue),
      },
    ],
  };
  const showkValue = (value) => {
    const val = Number(value);
    if (val > 0) {
      return `${(val).toFixed(1)} x`;
    } else if (val < 0) {
      return `- ${-1 * (val).toFixed(1)} x`;
    }
    return '';
  };
  const showbValue = (value) => {
    const val = Number(value);
    if (!val) return '';
    if (val > 0 && !Number(kValue)) return `${val}`;
    if (val > 0) {
      return ` + ${(val).toFixed(1)} `;
    } else if (val < 0) {
      return ` - ${-1 * (val).toFixed(1)} `;
    }
    return '';
  };
  notNullSum.value = Number(kValue) + Number(bValue) !== 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        {notNullSum.value ? (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = </span>
            <span>{showkValue(kValue)}</span>
            <span>{showbValue(bValue)}</span>
            <span className=''>{' — прямая'}</span>
          </div>
        ) : (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = 0 - прямая</span>
          </div>
        )}
      </div>
      <div className='chart__control'>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span className='chart__value'>k = {kValue} </span>
          <input
            onChange={(event) => changekvalue(event)}
            type='range'
            min='-5'
            max='5'
            step='0.1'
            defaultValue='0'
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'>b = {bValue}</span>
          <input
            onChange={(event) => changebvalue(event)}
            type='range'
            min='-10'
            max='10'
            step='0.5'
            defaultValue='0'
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

export default StraightLine;
