import * as echarts from 'echarts';
import { React, useState, useEffect } from 'react';
import './styles.scss';
import { probability } from '../chartsData/bigNumberLawData';
import { useCallback } from 'react';

function BigNumberLaw() {
  const [nValue, setN] = useState(6);

  const changeNvalue = (e) => setN(e.target.value || -2);

  const calculations = useCallback(() => {
    let xDataArr = [];
    let data = [];
    for (let i = 0; i < nValue; i++) {
      xDataArr.push(i + 1);
      const probabilityItem = probability.reduce(
        (acc, cval) => (cval === i + 1 ? (acc = acc + 1) : acc),
        0
      );
      data.push((probabilityItem / probability.length).toFixed(4));
    }
    return { xDataArr, data };
  }, [nValue]);

  useEffect(() => {
    const { xDataArr, data } = calculations();
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
          data: xDataArr,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Вероятность',
          type: 'bar',
          barWidth: '60%',
          data,
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [calculations, nValue]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span className='chart__title-name'>
            График Закона больших чисел{' '}
          </span>
        </div>
      </div>
      <div className='chart__control value-up-left'>
        <span>коэффициент</span>
        <div className='valueRange'>
          <span className='chart__value'>n = {nValue}</span>
          <input
            onChange={(event) => changeNvalue(event)}
            type='range'
            min='1'
            max='6'
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
