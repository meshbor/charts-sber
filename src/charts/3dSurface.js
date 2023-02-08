import { React, useEffect } from 'react';
import './styles.scss';
import * as echarts from 'echarts';
import 'echarts-gl';

function Surface() {
  useEffect(() => {
    let options = {
      backgroundColor: '#fff',
      visualMap: {
        show: true,
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
        light: {
          main: {
            intensity: 0,
          },
          ambient: {
            intensity: 1,
          },
        },
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
              return Math.sin(x * Math.PI + 1) * Math.sin(y * Math.PI + 1);
            },
          },
        },
      ],
    };
    let chartDom = document.getElementById('echartsID');
    let myChart = chartDom && echarts.init(chartDom);
    options && myChart && myChart.setOption(options, true);
    return () => myChart.dispose();
  }, []);

  return (
    <div className='wrapper'>
      <div className='chart__formula-description'>
        <div className='chart__formula'></div>
      </div>
      <div style={{ width: '700px', height: '500px' }} id='echartsID'></div>
    </div>
  );
}

export default Surface;
