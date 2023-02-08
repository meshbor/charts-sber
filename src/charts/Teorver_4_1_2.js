import { MathJax, MathJaxContext } from 'better-react-mathjax';
import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import useDebounce from '../utilites/useDebounce';
import './styles.scss';

function func(mu, sigma, x) {
  const down = sigma * Math.sqrt(2 * Math.PI);
  const left = 1 / down;
  const degree = Math.pow((x - mu) / sigma, 2) * -0.5;
  const right = Math.pow(Math.exp(1), degree);
  const res = left * right;
  return res;
}

function Teorver_4_1_2() {
  const [muValue, setMu] = useState('0.5');
  const [sigmaValue, setSigma] = useState('0.5');
  const [muValueDeb, setMuDeb] = useState('0.5');
  const [sigmaValueDeb, setSigmaDeb] = useState('0.5');

  const generateData = useMemo(() => {
    let data = [];

    const step =
      sigmaValue.includes('0.2') || sigmaValue.includes('0.3') ? 0.01 : 0.05;

    for (let i = -2.5; i < 2.5; i += step) {
      data.push([i, func(muValue, sigmaValue, i)]);
    }
    return data;
  }, [muValue, sigmaValue]);

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
        min: -2.5,
        max: 2.5,
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
        max: 2,
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
  }, [generateData, muValue, sigmaValue]);

  const config = {
    loader: { load: ['input/asciimath'] },
  };

  const debounceValueMu = useDebounce(muValueDeb, 100);
  const debounceValueSi = useDebounce(sigmaValueDeb, 100);

  useEffect(() => {
    setMu(debounceValueMu);
  }, [debounceValueMu]);

  useEffect(() => {
    setSigma(debounceValueSi);
  }, [debounceValueSi]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span style={{ fontSize: '18px' }}>
            <MathJaxContext config={config}>
              <MathJax>
                График{' '}
                {
                  '`p(x)  = frac(1)(σsqrt(2π)) e^(-frac(1)(2) (frac(x - μ)(σ))^2)`'
                }
              </MathJax>
            </MathJaxContext>
          </span>
        </div>
      </div>
      <div className='chart__control value-up' style={{ top: '37px' }}>
        <span>Параметры</span>
        <div className='valueRange'>
          <span className='chart__value'> μ = {muValue}</span>
          <input
            onChange={(event) => setMuDeb(event.target.value)}
            type='range'
            min='-2'
            max='2'
            step='0.5'
            defaultValue={1}
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'> σ = {sigmaValue}</span>
          <input
            onChange={(event) => setSigmaDeb(event.target.value)}
            type='range'
            min='0.2'
            max='1'
            step='0.1'
            defaultValue={0.4}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Teorver_4_1_2;
