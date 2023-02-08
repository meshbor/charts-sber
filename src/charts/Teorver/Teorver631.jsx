import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';

import '../styles.scss';
import './styles.scss';

import useDebounce from '../../utilites/useDebounce';
import { denominator631 } from './constants';

function Teorver631() {
  const [aValue, setA] = useState(1);
  const [aValueDebounce, setADebounce] = useState(25);

  const generateWeibull = useMemo(() => {
    let data = [];
    for (let i = 0; i < 80; i += 0.5) {
      const i20 = Number((i / 20).toFixed(3));
      const up1 = i20 * 0.1 * Math.exp(-1 * Math.pow(i20, 2));
      data.push([i, up1]);
    }
    return data;
  }, []);
  const generateWeibull2 = useMemo(() => {
    let data = [];
    for (let i = aValue; i < 80; i += 0.5) {
      const i20 = Number((i / 20).toFixed(3));
      const up1 = i20 * 0.1 * Math.exp(-1 * Math.pow(i20, 2));
      data.push([i, up1]);
    }
    return data;
  }, [aValue]);

  const generateGamma = useMemo(() => {
    let data = [];
    for (let i = 0; i < 80; i += 0.5) {
      const up1 = Math.pow(i, 7);
      const up2 = Math.exp((-i / 4).toFixed(4));
      const numenator = up1 * up2;
      const up4 = (numenator / denominator631).toFixed(4);
      data.push([i, up4]);
    }
    return data;
  }, []);
  const debounceValueA = useDebounce(aValueDebounce, 100);

  useEffect(() => {
    setA(debounceValueA);
  }, [debounceValueA]);

  useEffect(() => {
    let options = {
      tooltip: {
        trigger: 'axis',

        showContent: false,
      },
      legend: {},
      xAxis: {
        // max: 5,
        axisLabel: {
          show: true,
        },
      },
      yAxis: {
        // min: -1.5,
        // max: 1.5,
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          // startValue: -20,
          // endValue: 20,
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          // startValue: -20,
          // endValue: 20,
        },
      ],
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: [0],
        pieces: [
          {
            gt: 0,
            lt: aValue,
            color: 'rgba(0, 0, 180, 0.4)',
          },
        ],
      },
      animation: false,
      series: [
        {
          data: generateGamma,
          type: 'line',
          color: 'blue',
          showSymbol: false,
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            data: [{ xAxis: aValue }],
          },
          areaStyle: {},
        },
        {
          data: generateGamma,
          type: 'line',
          color: 'blue',
          showSymbol: false,
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
          },
        },
        {
          data: generateWeibull,
          type: 'line',
          color: '#d24848',
          showSymbol: false,
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
          },
        },
        {
          data: generateWeibull2,
          type: 'line',
          color: '#d24848',
          showSymbol: false,
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
          },
          areaStyle: {},
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [aValue, generateGamma, generateWeibull, generateWeibull2]);

  return (
    <div className='wrapper'>
      <div className='charts__description'>
        <div className='charts__description__item'>
          <span>Ошибка первого рода</span>
          <div className='first'></div>
        </div>
        <div className='charts__description__item'>
          <span>Ошибка второго рода</span>
          <div className='second'></div>
        </div>
      </div>
      <div className='chart__control value-up'>
        <span>Параметр</span>
        <div className='valueRange'>
          <span className='chart__value'> h = {debounceValueA}</span>
          <input
            onChange={(event) => setADebounce(Number(event.target.value))}
            type='range'
            min='0'
            max='50'
            step='0.5'
            defaultValue={25}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Teorver631;
