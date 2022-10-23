import ReactEcharts from 'echarts-for-react';
import { useState } from 'react';
import './styles.css';

function func(x, a, b, c) {
  let res = a * x ** 2;
  let res2 = b * x;
  const res4 = Number(res) + Number(res2) + Number(c);
  return res4;
}
function generateData(aValue, bValue, cValue) {
  let data = [];
  for (let i = -200; i <= 200; i += 0.1) {
    data.push([i, func(i, aValue, bValue, cValue)]);
  }
  return data;
}

function App() {
  const [aValue, setA] = useState(1);
  const [bValue, setB] = useState(0);
  const [cValue, setC] = useState(0);

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
      },
      minorSplitLine: {
        show: true,
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
        showSymbol: false,
        clip: true,
        data: generateData(aValue, bValue, cValue),
      },
    ],
  };
  return (
    <div className='wrapper'>
      <div>
        График y={aValue}*x^2 + x*{bValue} +{cValue}— парабола
      </div>
      <ReactEcharts
        option={options}
        style={{ width: '600px', height: '500px' }}
      ></ReactEcharts>
      <div>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span>a </span>
          <input
            onChange={(event) => changeAvalue(event)}
            type='range'
            min='-5'
            max='5'
            step='0.2'
            defaultValue='1'
          />
          <div>{aValue}</div>
        </div>
        <div className='valueRange'>
          <span>b </span>
          <input
            onChange={(event) => changeBvalue(event)}
            type='range'
            min='-5'
            max='5'
            step='0.1'
            defaultValue='0'
          />
          <div>{bValue}</div>
        </div>
        <div className='valueRange'>
          <span>c </span>
          <input
            onChange={(event) => changeCvalue(event)}
            type='range'
            min='-10'
            max='10'
            step='0.5'
            defaultValue='0'
          />
          <div>{cValue}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
