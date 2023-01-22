import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import useDebounce from '../utilites/useDebounce';
import './styles.scss';

function EpsilonScutter() {
  const [muValue, setMu] = useState('0.5');
  const [muValueDeb, setMuDeb] = useState('0.5');

  const generateData = useMemo(() => {
    let data = [];
    for (let i = 1; i < 20; i += 1) {
      data.push([i, 1 / i]);
    }
    return data;
  }, [muValue]);

  const generateDataLine = () => {
    let data = [];
    for (let i = 0; i < 22; i += 0.1) {
      data.push([i, muValue]);
    }
    return data;
  };

  const generateDataLine2 = () => {
    let data = [];
    for (let i = 0; i < 22; i += 0.1) {
      data.push([i, -muValue]);
    }
    return data;
  };

  useEffect(() => {
    let options = {
      tooltip: {
        trigger: 'axis',
        formatter: (val) =>
          ` x = ${val[0].value[0] !== 0 ? val[0].value[0].toFixed(2) : 'a'}`,
      },
      xAxis: {
        name: 'n',

        max: 21,
        axisLabel: {
          show: true,
        },
      },
      yAxis: {
        name: '1/n',
        min: -Number(muValue) * 2,
        max: Number(muValue) * 2,
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          // startValue: -10,
          // endValue: 10,
        },
      ],
      series: [
        {
          symbolSize: 15,
          // data: [
          //   [0, 0],
          //   [1, 1],
          //   [2, 0.5],
          //   [3, 0.33],
          // ],
          data: generateData,

          type: 'scatter',
          color: '#000000',
        },
        {
          // symbolSize: 10,
          data: generateDataLine(),
          type: 'line',
          color: 'blue',
          showSymbol: false,
          clip: true,
        },
        {
          // symbolSize: 10,
          data: generateDataLine2(),
          type: 'line',
          color: 'blue',
          showSymbol: false,
          clip: true,
        },
        {
          symbolSize: 10,
          data: [[0, 0]],
          // data: generateData,
          type: 'scatter',
          color: 'green',
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [generateData, muValue]);

  const debounceValueMu = useDebounce(muValueDeb, 100);

  useEffect(() => {
    setMu(debounceValueMu);
  }, [debounceValueMu]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'></div>
      </div>
      <div
        className='chart__control value-up'
        style={{ top: '142px', gap: '5px' }}
      >
        <span>Значение эпсилон</span>
        <div className='valueRange'>
          <span className='chart__value'> ε = {muValue}</span>
          <input
            onChange={(event) => setMuDeb(event.target.value)}
            type='range'
            min='0'
            max='1'
            step='0.05'
            defaultValue={0.5}
          />
        </div>
      </div>

      <div style={{ width: '700px', height: '500px' }} id='echartsID'>
        <span
          style={{
            position: 'absolute',
            top: '375px',
            left: '67px',
            zIndex: '110',
            background: 'white',
            width: '28px',
          }}
        >
          a
        </span>
      </div>
    </div>
  );
}

export default EpsilonScutter;
