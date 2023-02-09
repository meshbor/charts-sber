import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo, useCallback } from 'react';
import useDebounce from '../../utilites/useDebounce';
import '../styles.scss';

function Matan_10_1() {
  const [aValue, setA] = useState(1);
  const [qValue, setQ] = useState(0.5);
  const [aValueDebounce, setADebounce] = useState(1);
  const [qValueDebounce, setQDebounce] = useState(0.5);

  const calculations = useCallback((a, q, x) => {
    const denominator = 1 - Math.pow(q, Math.ceil(x));
    const numerator = 1 - q;
    const res = denominator / numerator;
    return res * a;
  }, []);

  const calculateAsipmtote = useMemo(() => {
    return aValue / (1 - qValue);
  }, [aValue, qValue]);

  const generateData = useMemo(() => {
    let data = [];
    for (let i = 1; i < 7; i += 1) {
      if (qValue === 1) {
        data.push([i, i * aValue]);
      } else {
        data.push([i, calculations(aValue, qValue, i)]);
      }
    }
    return data;
  }, [aValue, calculations, qValue]);

  const generateDataLine = useMemo(() => {
    let data = [];
    for (let i = -3 ; i < 3  ; i += 0.5) {
      data.push([i, -i + 1]);
    }
    return data;
  }, []);

  const debounceValueA = useDebounce(aValueDebounce, 200);
  const debounceValueQ = useDebounce(qValueDebounce, 200);

  useEffect(() => {
    setA(debounceValueA);
  }, [debounceValueA]);
  useEffect(() => {
    setQ(debounceValueQ);
  }, [debounceValueQ]);

  useEffect(() => {
    let options = {
      // tooltip: {
      //   // trigger: 'axis',
      // },
      xAxis: {
        // max: 5,
        axisLabel: {
          show: true,
        },
      },
      yAxis: {
        // min: -calculateAsipmtote * 2,
        // max: calculateAsipmtote * 2,
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          startValue: -100,
          endValue: 100,
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
          data: generateDataLine,
          type: 'line',
          color: 'red',
          showSymbol: false,
        },
        {
          data: [[0.2,0.2], [2,1]],
          type: 'bar'
        },
      ],
    };

    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [generateData, aValue, calculateAsipmtote]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          {/* <MathJaxContext config={mathConfig}>
            <MathJax>График {'`y  = b + frac(a)(x)`'}</MathJax>
          </MathJaxContext> */}
        </div>
      </div>
      <div
        className='chart__control value-down'
        style={{ top: '63px', left: '111px', gap: '5px' }}
      >
        <span>Параметры a и q</span>
        <div className='valueRange'>
          <span className='chart__value'> a = {aValue}</span>
          <input
            onChange={(event) => setADebounce(Number(event.target.value))}
            type='range'
            min='-10'
            max='10'
            step='1'
            defaultValue={1}
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'> q = {qValue}</span>
          <input
            onChange={(event) => setQDebounce(Number(event.target.value))}
            type='range'
            min='-1'
            max='1'
            step='0.1'
            defaultValue={0.5}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Matan_10_1;
