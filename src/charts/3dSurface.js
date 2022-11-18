import { React, useState, useRef, useEffect } from 'react';
import './styles.scss';
import * as echarts from 'echarts';
import 'echarts-gl';

function Surface() {
  const [aValue, setA] = useState(1);
  const notNullSum = useRef(false);

  const changeAvalue = (e) => setA(e.target.value || 1);

  notNullSum.value = Number(aValue) !== 0;

  useEffect(() => {
    let options = {
      tooltip: {},
      backgroundColor: '#fff',
      visualMap: {
        show: false,
        dimension: 2,
        min: -1,
        max: 1,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026',
          ],
        },
      },
      xAxis3D: {
        type: 'value',
      },
      yAxis3D: {
        type: 'value',
      },
      zAxis3D: {
        type: 'value',
      },
      grid3D: {
        viewControl: {
          // projection: 'orthographic'
        },
      },
      series: [
        {
          type: 'surface',
          wireframe: {
            // show: false
          },
          equation: {
            x: {
              step: 0.05,
            },
            y: {
              step: 0.05,
            },
            z: function (x, y) {
              if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                return '-';
              }
              return Math.sin(x * Math.PI + aValue) * Math.sin(y * Math.PI + aValue);
            },
          },
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
  }, [aValue]);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        {notNullSum.value ? (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            {/* <span className=''>y = </span>
            <span className=''>
              {
                <span className='show'>
                  a<sup> x</sup>
                </span>
              }
            </span>
            <span className=''>{' — степенная функция'}</span>
            {<sup className='show_white'>{aValue}</sup>} */}
          </div>
        ) : (
          <div className='chart__formula'>
            <span className='chart__title-name'>График </span>
            <span className=''>y = 0</span>
          </div>
        )}
      </div>
      <div className='chart__control'>
        <span>коэффициенты</span>
        <div className='valueRange'>
          <span className='chart__value'>a = {aValue}</span>
          <input
            onChange={(event) => changeAvalue(event)}
            type='range'
            min='3'
            max='10'
            step='1'
            defaultValue='2'
          />
        </div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Surface;
