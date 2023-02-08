import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo, useRef } from 'react';
import {
  distributionNormal,
  distributionMedium,
} from '../constants/distributionNormal';
import useDebounce from '../utilites/useDebounce';
import './styles.scss';

function NormalDistribution() {
  const [muValue, setMu] = useState('3');
  const [muValueDeb, setMuDeb] = useState('3');

  const min = useRef(-0.3418921871695516);
  const medium = useRef(distributionNormal[0]);

  const generateData = useMemo(() => {
    let data = [];
    let tempMin = 100;
    for (let i = 1; i < muValue; i += 1) {
      data.push([distributionNormal[i], 2]);
      tempMin = Math.min(tempMin, distributionNormal[i]);
      medium.current = distributionMedium[i];
    }
    min.current = tempMin;
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
        min: 0,
        max: 4,
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
        {
          symbolSize: 10,
          data: [[-0.3418921871695516, 2]],
          type: 'scatter',
          color: 'red',
        },
        {
          symbolSize: 10,
          data: [[medium.current, 2]],
          type: 'scatter',
          color: 'lightgreen',
        },
        {
          symbolSize: 10,
          data: [[min.current, 2]],
          type: 'scatter',
          color: 'orange',
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [generateData, muValue, medium]);

  const debounceValueMu = useDebounce(muValueDeb, 100);

  useEffect(() => {
    setMu(debounceValueMu);
  }, [debounceValueMu]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span style={{ fontSize: '18px' }}>
            Выборка из стандартного нормального распределения
          </span>
          <div className='normal-distribution__info'>
            <div>
              <span className='normal-distribution__red'>
                Первый элемент выборки{' '}
              </span>
              <span>-0.3418921871695516</span>
            </div>
            <div>
              <span className='normal-distribution__orange'>
                Минимальный элемент выборки{' '}
              </span>
              <span>{min.current}</span>
            </div>
            <div>
              <span className='normal-distribution__green'>
                Выборочное среднее{' '}
              </span>
              <span>{medium.current}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='chart__control value-up'>
        <span>Размер выборки</span>
        <div className='valueRange'>
          <span className='chart__value'> n = {muValue}</span>
          <input
            onChange={(event) => setMuDeb(event.target.value)}
            type='range'
            min='3'
            max='10000'
            step='1'
            // defaultValue={1}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default NormalDistribution;
