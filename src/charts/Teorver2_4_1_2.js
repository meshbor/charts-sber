import { MathJax, MathJaxContext } from 'better-react-mathjax';
import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import useDebounce from '../utilites/useDebounce';
import './styles.scss';

function func(lambdaValue, x) {
  const degree = -(lambdaValue * x);
  const preRes = Math.pow(Math.exp(1), degree);
  const res = lambdaValue * preRes;
  return res;
}

function Teorver2_4_1_2() {
  const [lambdaValue, setMu] = useState('2.7');
  const [lambdaValueDeb, setMuDeb] = useState('2.7');

  const generateData = useMemo(() => {
    let data = [];

    for (let i = 0; i <= 4; i += 0.01) {
      data.push([i, func(lambdaValue, i)]);
    }
    return data;
  }, [lambdaValue]);

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
        min: 0,
        max: 4,
        minorTick: {
          show: true,
          // splitNumber: 1,
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
        min: 0,
        max: 3,
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
          // clip: true,
          data: generateData,
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [generateData, lambdaValue]);

  const config = {
    loader: { load: ['input/asciimath'] },
  };

  const debounceValueMu = useDebounce(lambdaValueDeb, 100);

  useEffect(() => {
    setMu(debounceValueMu);
  }, [debounceValueMu]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span style={{ fontSize: '18px' }}>
            <MathJaxContext config={config}>
              <MathJax>График {'`p(x)  = lambda e^(-lambda x), quad  x>=0`'}</MathJax>
            </MathJaxContext>
          </span>
        </div>
      </div>
      <div className='chart__control value-up'>
        <span>Параметр</span>
        <div className='valueRange'>
          <span className='chart__value'> λ = {lambdaValue}</span>
          <input
            onChange={(event) => setMuDeb(event.target.value)}
            type='range'
            min='0'
            max='3.00'
            step='0.1'
            defaultValue={2.7}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Teorver2_4_1_2;
