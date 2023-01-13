import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo, useRef } from 'react';
import {
  distributionNormal,
  distributionMedium,
} from '../constants/distributionNormal';
import useDebounce from '../utilites/useDebounce';
import './styles.scss';

function EpsilonScutter() {
  const [muValue, setMu] = useState('0.5');
  const [muValueDeb, setMuDeb] = useState('0.5');

  const generateData = useMemo(() => {
    let data = [];
    for (let i = 1; i < 10; i += 0.1) {
      data.push([i, 1 / muValue]);
    }
    return data;
  }, [muValue]);

  useEffect(() => {
    let options = {
      tooltip: {
        trigger: 'axis',
        formatter: (val) => val[0].value[0].toFixed(16),
      },
      xAxis: {},
      yAxis: {
        // min: 0,
        // max: 4,
        axisLabel: {
          show: false,
        },
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
          startValue: -10,
          endValue: 10,
        },
      ],
      series: [
        {
          symbolSize: 10,
          data: generateData,
          type: 'scatter',
          color: 'grey',
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
        <div className='chart__formula'>
          <span style={{ fontSize: '18px' }}>
            График Стандартного распределения
          </span>
        </div>
      </div>
      <div className='chart__control value-up'>
        <span>коэффициент</span>
        <div className='valueRange'>
          <span className='chart__value'> n = {muValue}</span>
          <input
            onChange={(event) => setMuDeb(event.target.value)}
            type='range'
            min='0'
            max='4'
            step='0.1'
            // defaultValue={1}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default EpsilonScutter;
