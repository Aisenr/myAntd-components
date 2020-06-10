import React from 'react';
import moment from 'moment';
import { Button } from 'antd';
import {
  InputItem, ParseCode, FileUpload, PositionInputBox, TimeInterval, FormGroup, DatePicker,
  Panel, Container
} from '../../components';

const PhoneNunberRegExp = /(^(86|17951)?(1(3|5|6|8)[0-9]|17[0678]|14[57])[0-9]{8}$)/;

const formItemLayout = {
  labelCol: {
    sm: { span: 0 },
  },
  wrapperCol: {
    sm: { span: 24 },
  },
};

export default class FormMultipleColumnsExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      disabled: true,
      areaDescription: null,
      defaultFileList: [],
      submitBtnStatue: false,
      chargeMoney: 0,
    };
  }

  basicItems = [
    { label: '公厕名称', dataIndex: 'toiletName', rules: ['required', { max: 40, message: '公厕名称请不要超过40个字符！' }], hasFeedback: false },
    { label: '详情地址',
      dataIndex: 'detailsAddress',
      rules: ['required'],
      render: () => {
        return <PositionInputBox readOnly />;
      },
    },
    { label: '楼层说明', dataIndex: 'toiletFloor', rules: [{ max: 40, message: '楼层说明请不要超过40个字符！' }] },
    { label: '公厕类型',
      dataIndex: 'toiletType',
      defaultValue: 'toilet2',
      // render: () => <ParseCode type="toiletType" display="radio" valueIndex="dictValue" textIndex="text" />
    },
    { label: '所属单位', dataIndex: 'toiletSubordinate', rules: [{ max: 40, message: '所属单位请不要超过40个字符！' }] },
    { label: '开放时间',
      dataIndex: 'timeInterval',
      size: 'two-column-wrap-item-span-2',
      render: () => <TimeInterval
        restrict
        disabled={this.state.disabled}
        defaultValue={[moment('06:00', 'HH:mm'), moment('22:00', 'HH:mm')]}
        // onChange={this.timeOnchange}
      />,
    },
    { label: '创建时间', dataIndex: 'createDate', render: () => <DatePicker /> },
    { label: '时间范围', dataIndex: 'dateRange', render: () => <DatePicker.RangePicker /> },
    { label: '管理员', dataIndex: 'cleanerName' },
    { label: '手机号', dataIndex: 'cleanerPhone', rules: [{ pattern: PhoneNunberRegExp, message: '请填写正确的手机号！' }] },
    { label: '消防设备',
      dataIndex: 'toiletFireProtection',
      defaultValue: '0',
      render: () => <InputItem addonAfter="个" />,
    },
    { label: '',
      dataIndex: 'btn',
      size: 'two-column-wrap-item-span-2',
      render: () => <Button type="primary">提交</Button>,
    },
  ];

  render() {
    return (
      <Container>
        <Panel>
          <FormGroup size="two-column-wrap" items={this.basicItems} />
        </Panel>
      </Container>
    );
  }
}
