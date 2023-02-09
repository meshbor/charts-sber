import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import './styles.scss';
import { probability } from '../chartsData/bigNumberLawData';
import { useCallback } from 'react';
import useDebounce from '../utilites/useDebounce';

function BigNumberLaw() {
  const [nValue, setN] = useState(6);
  const [debValue, setDebValue] = useState(6);

  const slicedProbability = useMemo(
    () => probability.slice(0, Number(nValue)),
    [nValue]
  );

  const calculations = useCallback(() => {
    let data = [];
    let probabilityObj = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    for (let i = 0; i < slicedProbability.length; i++) {
      probabilityObj[slicedProbability[i]] += 1;
    }
    data = [0, 0, 0, 0, 0, 0].map((e, i) =>
      (probabilityObj[i + 1] / slicedProbability.length).toFixed(3)
    );
    return { data };
  }, [slicedProbability]);

  useEffect(() => {
    const { data } = calculations();
    let options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          // data: xDataArr,
          data: [1, 2, 3, 4, 5, 6],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 1,
        },
      ],
      series: [
        {
          name: 'Частота',
          type: 'bar',
          barWidth: '60%',
          data,
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [calculations, nValue]);

  const debounceValue = useDebounce(debValue, 500);

  useEffect(() => {
    setN(debounceValue);
  }, [debounceValue]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span className='chart__title-name'>
            Частоты значений{' '}
          </span>
        </div>
      </div>
      <div className='chart__control value-up-left'>
        <span>Число испытаний</span>
        <div className='valueRange'>
          <span className='chart__value'>n = {nValue}</span>
          <input
            onChange={(event) => setDebValue(event.target.value)}
            type='range'
            min='1'
            max='1000'
            step='1'
            defaultValue='6'
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default BigNumberLaw;
