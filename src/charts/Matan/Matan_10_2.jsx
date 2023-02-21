import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { mathConfig } from '../../constants/mathConfig';

import '../styles.scss';
import './styles.scss';

const selectOptions = [
  { value: 'line', label: 'f(x) = 2x-1' },
  {
    value: 'x3',
    label: (
      <span>
        f(x) = x<sup>3</sup>/8
      </span>
    ),
  },
  { value: '4', label: 'f(x) = 4' },
];

// @https://t.me/vnmrdvtc - initiator
function Matan102() {
  const [selectValue, setSelect] = useState(selectOptions[0]);
  const [configData, setConfigData] = useState({ from: -2, to: 3 });
  const generateGamma = useMemo(() => {
    let data = [];
    for (let i = -10; i < 10; i += 0.05) {
      const res =
        configData.type === 'x3'
          ? Math.pow(i, 3) / 8
          : configData.type === '4'
          ? 4
          : 2 * i - 1;

      data.push([i, res]);
    }
    return data;
  }, [configData]);

  useEffect(() => {
    switch (selectValue) {
      case 'line':
        return setConfigData((state) => ({
          from: -2,
          to: 3,
          type: 'line',
        }));
      case 'x3':
        return setConfigData((state) => ({
          from: 0,
          to: 4,
          type: 'x3',
        }));
      case '4':
        return setConfigData((state) => ({
          from: 2,
          to: 8,
          type: '4',
        }));
      default:
        return setConfigData((state) => ({
          from: -2,
          to: 3,
          type: 'line',
        }));
    }
  }, [selectValue]);

  useEffect(() => {
    let options = {
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => value.toFixed(2),
      },
      legend: {},
      xAxis: {
        name: 'x',
        max: 10,
        min: -6,
        axisLabel: {
          show: true,
        },
      },
      yAxis: {
        name: 'y',
        min: -6,
        max: 8,
      },
      dataZoom: [
        {
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
            },
          ],
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
        },
      ],
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: [0],
        pieces: [
          {
            gt: configData.from,
            lt: configData.to,
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
            data: [{ xAxis: configData.from }, { xAxis: configData.to }],
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
          symbolSize: 10,
          data: [[configData.from, 0]],
          type: 'scatter',
          color: '#ce5169',
        },
        {
          symbolSize: 10,
          data: [[configData.to, 0]],
          type: 'scatter',
          color: '#ce5169',
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, [generateGamma, configData]);

  return (
    <div className='wrapper'>
      <div
        className='charts__description'
        style={{ top: '45px', left: '120px' }}
      >
        {configData.type === 'line' && (
          <MathJaxContext config={mathConfig}>
            <MathJax> {'`int_-2^3 2x - dx = 0`'}</MathJax>
          </MathJaxContext>
        )}
        {configData.type === 'x3' && (
          <MathJaxContext config={mathConfig}>
            <MathJax> {'`int_0^4 (x^3) / 8 dx = 8`'}</MathJax>
          </MathJaxContext>
        )}
        {configData.type === '4' && (
          <MathJaxContext config={mathConfig}>
            <MathJax> {'`int_2^8 4dx = 24`'}</MathJax>
          </MathJaxContext>
        )}
      </div>
      <div className='chart__control' style={{ top: '30px', left: '520px' }}>
        <span>Вид графика</span>
        <div className='valueRange' style={{ marginTop: '8px' }}>
          <Select
            defaultValue={selectOptions[0]}
            style={{
              width: 150,
            }}
            options={selectOptions}
            onChange={(e) => setSelect(e)}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Matan102;
