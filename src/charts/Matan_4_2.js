import * as echarts from 'echarts';
import { React, useState, useEffect, useMemo } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import './styles.scss';
import { mathConfig } from '../constants/mathConfig';

function Matan_4_2() {
  const [lossValue, setLoss] = useState(0);
  const [aValue, setA] = useState(1);
  const [bValue, setB] = useState(1);

  const changeAvalue = (e) => setA(Number(e.target.value));
  const changeBvalue = (e) => setB(Number(e.target.value));

  const generateHyperbola = useMemo(() => {
    let data = [];
    for (let i = 0.1; i < 10; i += 0.1) {
      const hyperbola = bValue + aValue / i;
      data.push([i, hyperbola]);
    }
    return data;
  }, [aValue, bValue]);

  useEffect(() => {
    const arr = [
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
    ];
    const res = arr.reduce(
      (acc, el) => {
        const tmp = aValue / el[0];
        const tmp2 = bValue - el[1];
        const tmp3 = tmp + tmp2;
        const tmp4 = Math.pow(tmp3, 2);
        return (acc = Number(acc) + Number(tmp4));
      },
      [0]
    );

    setLoss(res);
  }, [aValue, bValue]);

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
        min: 0,
        max: 20,
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
    return () => myChart.dispose();
  }, [generateHyperbola]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'>
          <MathJaxContext config={mathConfig}>
            <MathJax>График {'`y  = b + frac(a)(x)`'}</MathJax>
          </MathJaxContext>
          <div style={{marginTop: '10px'}}>loss(a,b) = {lossValue.toFixed(2)} </div>
        </div>
      </div>
      <div
        className='chart__control value-up'
        style={{ top: '142px', gap: '5px' }}
      >
        <span>Параметры a и b</span>
        <div className='valueRange'>
          <span className='chart__value'>a = {aValue} </span>
          <input
            onChange={(event) => changeAvalue(event)}
            type='range'
            min='1'
            max='7'
            step='0.5'
            defaultValue='1'
          />
        </div>
        <div className='valueRange'>
          <span className='chart__value'>b = {bValue}</span>
          <input
            onChange={(event) => changeBvalue(event)}
            type='range'
            min='1'
            max='7'
            step='0.5'
            defaultValue='1'
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Matan_4_2;
