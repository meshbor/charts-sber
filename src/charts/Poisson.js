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

console.log('test');


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

    series: [
      {
        type: 'line',
        color: 'blue',
        showSymbol: false,
        clip: true,
        data: generateData(alpha),
      },
    ],
  };
  notNullSum.value = Number(alpha) !== 0;

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
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
