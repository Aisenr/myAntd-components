import React from 'react';
import { AreaSelect } from '../../components';
import '../../components/area-select-modal/style';
import '../../components/area-select-one-level/style';

const regionRestrict = [
  '1101',
  '1201',
  '3101',
  '5001',
  '1301',
  '1304',
  '1401',
  '1501',
  '2101',
  '2102',
  '2201',
  '2301',
  '3201',
  '3205',
  '3301',
  '3302',
  '3401',
  '3407',
  '3501',
  '3502',
  '3601',
  '3609',
  '3701',
  '3702',
  '3709',
  '4101',
  '4201',
  '4205',
  '4301',
  '4401',
  '4403',
  '4501',
  '4601',
  '5101',
  '5106',
  '5108',
  '5201',
  '5301',
  '5401',
  '5402',
  '6101',
  '6104',
  '6201',
  '6301',
  '6401',
  '6501',
];

const selfOptions = [{
  label: '北京市',
  value: '11',
  children: [
    {
      label: '市辖区',
      value: '1101',
      children: [
        {
          label: '东城区',
          value: '110101',
        },
        {
          label: '西城区',
          value: '110102',
        },
        {
          label: '朝阳区',
          value: '110105',
        },
        {
          label: '丰台区',
          value: '110106',
        },
        {
          label: '石景山区',
          value: '110107',
        },
        {
          label: '海淀区',
          value: '110108',
        },
        {
          label: '门头沟区',
          value: '110109',
        },
        {
          label: '房山区',
          value: '110111',
        },
        {
          label: '通州区',
          value: '110112',
        },
        {
          label: '顺义区',
          value: '110113',
        },
        {
          label: '昌平区',
          value: '110114',
        },
        {
          label: '大兴区',
          value: '110115',
        },
        {
          label: '怀柔区',
          value: '110116',
        },
        {
          label: '平谷区',
          value: '110117',
        },
        {
          label: '密云区',
          value: '110118',
        },
        {
          label: '延庆区',
          value: '110119',
        },
      ],
    },
  ],
},
{
  label: '天津市',
  value: '12',
  children: [
    {
      label: '市辖区',
      value: '1201',
      children: [
        {
          label: '和平区',
          value: '120101',
        },
        {
          label: '河东区',
          value: '120102',
        },
        {
          label: '河西区',
          value: '120103',
        },
        {
          label: '南开区',
          value: '120104',
        },
        {
          label: '河北区',
          value: '120105',
        },
        {
          label: '红桥区',
          value: '120106',
        },
        {
          label: '东丽区',
          value: '120110',
        },
        {
          label: '西青区',
          value: '120111',
        },
        {
          label: '津南区',
          value: '120112',
        },
        {
          label: '北辰区',
          value: '120113',
        },
        {
          label: '武清区',
          value: '120114',
        },
        {
          label: '宝坻区',
          value: '120115',
        },
        {
          label: '滨海新区',
          value: '120116',
        },
        {
          label: '宁河区',
          value: '120117',
        },
        {
          label: '静海区',
          value: '120118',
        },
        {
          label: '蓟州区',
          value: '120119',
        },
      ],
    },
  ],
}];

export default class AreaSelectExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value5: [],
      value6: [],
    };
  }

  onChange = (data) => {
    this.setState({
      value: data,
    });
  }

  onChange1 = (data) => {
    console.log(data);
    this.setState({
      value1: data,
    });
  }
  onChange2 = (data) => {
    this.setState({
      value2: data,
    });
  }
  onChange3 = (data) => {
    this.setState({
      value3: data,
    });
  }
  onChange4 = (data) => {
    this.setState({
      value4: data,
    });
  }
  onChange5 = (data) => {
    this.setState({
      value5: data,
    });
  }
  onChange6 = (data) => {
    console.log('data', data);
    this.setState({
      value5: data,
    });
  }
  render() {
    return (
      <div>
        onLevel选择（自定义数据）：<AreaSelect regionRestrict={regionRestrict} placeholder="请选择" style={{ width: '360px', margin: '20px auto' }} display="oneLevel" onChange={this.onChange6} value={this.state.value6} />
        <br />
        下拉选择：<AreaSelect style={{ width: '360px', margin: '20px auto' }} value={this.state.value} onChange={this.onChange} regionRestrict={['2101', '31', '41']} />
        <br />
        modal选择（单选）：<AreaSelect regionRestrict={['2101']} style={{ width: '360px', margin: '20px auto' }} display="modal" onChange={this.onChange1} value={this.state.value1} />
        <br />
        modal选择（单选，必选选到区级）：<AreaSelect toFinal style={{ width: '360px', margin: '20px auto' }} display="modal" onChange={this.onChange2} value={this.state.value2} />
        <br />
        modal选择（多选）：<AreaSelect type="multiple" style={{ width: '360px', margin: '20px auto' }} display="modal" onChange={this.onChange3} value={this.state.value3} />
        <br />
        modal选择（多选，必选选到区级）：<AreaSelect toFinal type="multiple" style={{ width: '360px', margin: '20px auto' }} display="modal" onChange={this.onChange4} value={this.state.value4} />
        <br />
        modal选择（自定义数据）：<AreaSelect options={selfOptions} style={{ width: '360px', margin: '20px auto' }} display="modal" onChange={this.onChange5} value={this.state.value5} />
        <br />
        下拉选择：<AreaSelect restrict={'210102'} style={{ width: '360px', margin: '20px auto' }} onChange={this.onChange5} value={this.state.value5} />
      </div>
    );
  }
}
