import React from 'react';
import { Echarts } from '../../components';

export default class EchartsExample extends React.Component {

  option = {
    grid: {
      top: 50,
      bottom: 40,
    },
    xAxis: {
      name: '月',
      type: 'category',
      splitLine: { show: false },
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    yAxis: {
      name: '吨',
      type: 'value',
      min: 0,
      splitLine: { show: false },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: {
      name: 'sum',
      type: 'bar',
      stack: 'sum',
      barWidth: '40%',
    },
  };

  data = {
    sum: [194, 54, 40, 24, 64, 32, 46, 23, 50, 24, 95, 105],
  };

  chartStyle = {
    height: '500px',
  }

  render() {
    return (
      <Echarts option={this.option} data={this.data} style={this.chartStyle} />
    );
  }
}
