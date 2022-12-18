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
function poisson_log(k, alpha) {
  return Math.exp(k * Math.log(alpha) - log_fact(k) - alpha);
}
function generateData(alpha) {
  let data = [];
  for (let i = 0; i <= 40; i += 1) {
    data.push([i, poisson_log(i, alpha)]);
  }
  return data;
}

function Poisson() {
  const [alpha, setP] = useState(1);

  const notNullSum = useRef(false);

  const changePvalue = (e) => setP(e.target.value || 0);

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
        // type: 'scatter',
        type: 'line',
        color: 'blue',
        showSymbol: false,
        clip: true,
        data: generateData(alpha),
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
    if (val > 0 && !Number(alpha)) return `${val}`;
    if (val > 0) {
      return ` + ${val.toFixed(1)} `;
    } else if (val < 0) {
      return ` - ${-1 * val.toFixed(1)} `;
    }
    return '';
  };
  notNullSum.value = Number(alpha) !== 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        {/* {notNullSum.value ? (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = </span>
            <span>{showkValue(alpha)}</span>
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
      <div className='chart__control value-up '>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span className='chart__value value-up'>λ= {alpha} </span>
          <input
            onChange={(event) => changePvalue(event)}
            type='range'
            min='0.1'
            max='20'
            step='0.1'
            defaultValue='1'
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

export default Poisson;
