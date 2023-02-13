import ReactEcharts from 'echarts-for-react';
import { React, useState, useRef } from 'react';
import './styles.scss';

function func(x, a, b, c) {
  let res = a * x ** 2;
  let res2 = b * x;
  const res4 = Number(res) + Number(res2) + Number(c);
  return res4;
}
function generateData(aValue, bValue, cValue) {
  let data = [];
  for (let i = -200; i <= 200; i += 0.05) {
    data.push([i, func(i, aValue, bValue, cValue)]);
  }
  return data;
}

function Parabola() {
  const [aValue, setA] = useState(1);
  const [bValue, setB] = useState(0);
  const [cValue, setC] = useState(0);
  const nullSum = useRef(false);

  const changeAvalue = (e) => setA(e.target.value || 1);
  const changeBvalue = (e) => setB(e.target.value || 0);
  const changeCvalue = (e) => setC(e.target.value || 0);

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
        splitNumber: 6,
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
        data: generateData(aValue, bValue, cValue),
      },
    ],
  };
  const showBValue = (value) => {
    const val = Number(value);
    if (val > 0) {
      if (val === 1 && Number(aValue) === 0) return ' x';

      if (val === 1) return ' + x';
      const sign = Number(aValue) === 0 ? '' : '+'

      return `${sign} ${val.toFixed(1)} x`;
    } else if (val < 0) {
      if (val === -1) return ' − x';

      return `− ${-1 * val.toFixed(1)} x`;
    }
    return '';
  };
  const showAValue = (value) => {
    const val = Number(value);
    if (val === 1 || !val) return '';
    if (val > 0) {
      return `${val} `;
    } else if (val < 0) {
      if (val === -1) return `− `;
      return `− ${-1 * val} `;
    }
    return '';
  };
  const showCValue = (value) => {
    const val = Number(value);
    if (!val) return '';
    if (val > 0 && !Number(bValue) && !Number(aValue)) return `${val}`;
    if (val > 0) {
      return ` + ${val} `;
    } else if (val < 0) {
      return ` - ${-1 * val} `;
    }
    return '';
  };
  nullSum.value =
    Number(aValue) === 0 && Number(bValue) === 0 && Number(cValue) === 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        {!nullSum.value ? (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = </span>
            <span className=''>
              {showAValue(aValue)}
              {
                <span className={!!Number(aValue) ? 'show' : 'not_show'}>
                  x<sup>2</sup>{' '}
                </span>
              }
            </span>
            <span>{showBValue(bValue)}</span>
            <span>{showCValue(cValue)}</span>
            <span className=''>
              {Number(aValue) ? ' — парабола' : ' — прямая'}
            </span>
            {<sup className='show_white'>2</sup>}
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
          <span className='chart__value'>a = {aValue} </span>
          <input
            onChange={(event) => changeAvalue(event)}
            type='range'
            min='-5'
            max='5'
            step='0.2'
            defaultValue='1'
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'>b = {bValue} </span>
          <input
            onChange={(event) => changeBvalue(event)}
            type='range'
            min='-5'
            max='5'
            step='0.1'
            defaultValue='0'
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'>c = {cValue}</span>
          <input
            onChange={(event) => changeCvalue(event)}
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

export default Parabola;
