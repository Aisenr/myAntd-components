import React from 'react';
import { Breadcrumb } from 'antd';
import { EchartsChinaMap } from '../../components';

export default class EchartsChinaMapExample extends React.Component {

  state = {
    mapType: '中国',
    areaId: '',
  }

  onSelectMap = (mapType, areaId) => {
    this.setState({ mapType, areaId });
  }

  chartStyle = {
    height: '700px',
  }

  data = [{ name: '11', value: 22456 }, { name: '12', value: 5508 }, { name: '13', value: 14573 }, { name: '14', value: 7905 }, { name: '15', value: 6847 }, { name: '21', value: 8819 }, { name: '22', value: 4872 }, { name: '23', value: 6048 }, { name: '31', value: 15807 }, { name: '32', value: 33837 }, { name: '33', value: 30431 }, { name: '34', value: 7172 }, { name: '35', value: 9069 }, { name: '36', value: 7016 }, { name: '37', value: 16288 }, { name: '41', value: 17688 }, { name: '42', value: 10674 }, { name: '43', value: 6203 }, { name: '44', value: 27410 }, { name: '45', value: 5082 }, { name: '46', value: 1579 }, { name: '50', value: 6182 }, { name: '51', value: 14248 }, { name: '52', value: 4594 }, { name: '53', value: 12524 }, { name: '54', value: 982 }, { name: '61', value: 8995 }, { name: '62', value: 3463 }, { name: '63', value: 1308 }, { name: '64', value: 1594 }, { name: '65', value: 4760 }, { name: '71', value: 1 }, { name: '81', value: 1925 }, { name: '82', value: 146 }];

  render() {
    return (
      <div>
        <Breadcrumb separator=">">
          {this.state.mapType.split('-').map((name, index) => {
            const mapType = this.state.mapType.slice(0, this.state.mapType.indexOf(name) + name.length);
            const areaId = this.state.areaId.slice(0, (index) * 2);
            return (
              <Breadcrumb.Item key={name}>
                <a onClick={() => this.onSelectMap(mapType, areaId)}>{name}</a>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <EchartsChinaMap mapType={this.state.mapType} data={this.data} max={40000} onMapTypeChange={this.onSelectMap} style={this.chartStyle} />
      </div>
    );
  }
}
