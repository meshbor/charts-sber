import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import './styles.scss';
import { mathConfig } from '../constants/mathConfig';

function Matan_4_2() {
  const [selectValue, setSelectValue] = useState([1.7, 7.8]);

  const generateData = useMemo(() => {
    let data = [[0, 0]];
    for (let i = 1; i < 20; i += 1) {
      data.push([i, 1 / i]);
    }
    return data;
  }, []);

  const generateHyperbola = useMemo(() => {
    let data = [];
    for (let i = 0.1; i < 10; i += 0.1) {
      const hyperbola = selectValue[1] + selectValue[0] / i;
      data.push([i, hyperbola]);
    }
    return data;
  }, [selectValue]);

  const scutterData = useMemo(
    () => [
      [1.7, 7.8],
      [2.3, 3.6],
      [5, 5],
      [7, 2.7],
      [8, 4],
      [4.2, 3.5],
      [6, 4],
      [0.7, 7],
      [1.3, 5.4],
      [3.2, 4.7],
    ],
    []
  );

  const optionsSelect = useMemo(
    () =>
      scutterData.map((e, i) => ({
        value: i,
        label: `a = ${e[0]},  b = ${e[1]}`,
      })),
    [scutterData]
  );

  useEffect(() => {
    let options = {
      // tooltip: {
      //   trigger: 'axis',
      //   formatter: (val) => val[0].value[0].toFixed(2),
      // },
      tooltip: {},
      xAxis: {
        // min: -1,
        // max: 21,
        axisLabel: {
          show: true,
        },
        minorTick: {
          show: true,
          // splitNumber: 1,
        },
      },
      yAxis: {
        // min: -2,
        // max: 10,
        // axisLabel: {
        //   show: false,
        // },
      },
      series: [
        {
          symbolSize: 15,
          data: [
            [1.7, 7.8],
            [2.3, 3.6],
            [5, 5],
            [7, 2.7],
            [8, 4],
            [4.2, 3.5],
            [6, 4],
            [0.7, 7],
            [1.3, 5.4],
            [3.2, 4.7],
          ],
          type: 'scatter',
          color: 'lightblue',
        },
        {
          data: generateHyperbola,
          type: 'line',
          color: 'blue',
          showSymbol: false,
          clip: true,
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [generateData, generateHyperbola]);



  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <MathJaxContext config={mathConfig}>
              <MathJax>
                График{' '}
                {
                  '`y  = b + frac(a)(x)`'
                }
              </MathJax>
            </MathJaxContext>
        </div>
      </div>
      <div className='chart__control value-up' style={{ top: '142px', gap: '5px' }}>
        <span>Параметры a и b</span>
        <div className='valueRange'>
          <Select
            defaultValue={optionsSelect[0]}
            style={{
              width: 150,
            }}
            options={optionsSelect}
            onChange={(e) => setSelectValue(scutterData[e])}
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Matan_4_2;
