import { MathJax, MathJaxContext } from 'better-react-mathjax';
import * as echarts from 'echarts';
import { React, useState, useEffect, useCallback, useMemo } from 'react';
import '../styles.scss';
import { yData_522, xData_522, strings_522 } from './constants';

function DistributionConvergence() {
  const [nValue, setS] = useState(1);

  const generateData = useMemo(() => {
    let data = [];

    for (let i = 0; i < yData_522.length; i++) {
      data.push([xData_522[i], yData_522[i]]);
    }
    return data;
  }, []);
  const generateDataStrings = useMemo(() => {
    let data = [];
    let dataX = strings_522[nValue - 1][0];
    let dataY = strings_522[nValue - 1][1];

    for (let i = 0; i < dataX.length; i += 2) {
      data.push([dataX[i], dataY[i - 1] ?? 0]);
      dataX[i + 1] && data.push([dataX[i + 1], dataY[i - 1] ?? 0]);
      data.push(null);
    }
    return data;
  }, [nValue]);

  const changeNvalue = (e) => setS(e.target.value);

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
        min: -5,
        max: 5,
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
          show: false,
        },
      },
      yAxis: {
        name: 'y',
        min: -0.5,
        max: 1.5,
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
          // startValue: -5,
          // endValue: 5,
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          // startValue: -100,
          // endValue: 100,
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
        {
          type: 'line',
          color: 'red',
          showSymbol: false,
          clip: false,
          data: generateDataStrings,
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [generateData, generateDataStrings]);

  const config = {
    loader: { load: ['input/asciimath'] },
  };

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <span>Центральная предельная теорема</span>
        </div>
      </div>
      <div className='chart__control'>
        <span>Параметр</span>
        <div className='valueRange'>
          <span className='chart__value'>n = {nValue}</span>
          <input
            onChange={(event) => changeNvalue(event)}
            type='range'
            min='1'
            max='32'
            step='1'
            defaultValue={1}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default DistributionConvergence;
