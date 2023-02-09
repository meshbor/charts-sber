import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

import { Select } from 'antd';

import './styles.scss';
import { mathConfig } from '../constants/mathConfig';

function Matan_Integral() {
  const [aValue, setA] = useState(Math.PI);

  const generateData = useMemo(() => {
    let data = [];
    for (let i = 0; i < 6; i += 0.1) {
      data.push([i, -1 * Math.cos(i)]);
    }
    return data;
  }, []);

  const generateDataSin = useMemo(() => {
    let data = [];
    for (let i = 0; i < 6; i += 0.1) {
      data.push([i, Math.sin(i)]);
    }
    return data;
  }, []);

  useEffect(() => {
    let options = {
      // tooltip: {
      //   // trigger: 'axis',
      // },
      xAxis: {
        max: 5,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        min: -1.5,
        max: 1.5,
      },

      series: [
        {
          data: generateData,
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            data: [{ xAxis: aValue }],
          },
          type: 'line',
          color: 'blue',
          showSymbol: false,
          animation: false,
        },

        {
          data: [aValue !== Math.PI ? [aValue, 0] : [aValue, 1]],
          symbolSize: 10,
          type: 'scatter',
          color: 'red',
        },
        {
          data: [[0, -1]],
          symbolSize: 10,
          type: 'scatter',
          color: 'red',
        },
      ],
    };
    let options2 = {
      // tooltip: {
      //   trigger: 'axis',
      // },
      xAxis: {
        max: 5,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        min: -1.5,
        max: 1.5,
      },
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
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
          data: generateDataSin,
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
          data: generateDataSin,
          type: 'line',
          color: 'blue',
          showSymbol: false,
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            data: [{ xAxis: aValue }],
          },
        },
      ],
    };
    let chartDom2 = document.getElementById('echartsID2');
    let myChart2 = chartDom2 && echarts.init(chartDom2);
    options2 && myChart2 && myChart2.setOption(options2, true);
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [generateData, aValue, generateDataSin]);

  return (
    <div className='wrapper'>
      <div
        className='chart__control value-up'
        style={{
          top: '105px',
          left: '120px',
          gap: '5px',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <span style={{ marginRight: '3px' }}>Граница </span>
        <span className='chart__control__cos'>
          {' '}
          <MathJaxContext config={mathConfig}>
            <MathJax> {'`F(x) = -cos(x)`'}</MathJax>
          </MathJaxContext>
        </span>
        <span className='chart__control__sin'>
          {' '}
          <MathJaxContext config={mathConfig}>
            <MathJax> {'`F(x) = sin(x)`'}</MathJax>
          </MathJaxContext>
        </span>
        <div className='valueRange'>
          <div className='valueRange'>
            <Select
              defaultValue={aValue}
              style={{
                width: 100,
              }}
              options={[
                { value: Math.PI, label: 'π' },
                { value: Math.PI / 2, label: 'π / 2' },
              ]}
              onChange={(e) => setA(e)}
            />
          </div>
        </div>
      </div>

      <div style={{ width: '700px', height: '450px' }} id='echartsID'></div>
      <div
        style={{
          width: '700px',
          height: '450px',
          position: 'fixed',
          top: '360px',
        }}
        id='echartsID2'
      ></div>
    </div>
  );
}

export default Matan_Integral;
