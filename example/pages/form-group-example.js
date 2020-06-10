import React from 'react';
import moment from 'moment';
import { Button, Form, Icon } from 'antd';
import {
  InputItem, FormGroup, FileUpload, PositionInputBox, TimeInterval, DatePicker,
  Container, Panel, RadioButtonGroup, SelectArea, RadioItem,
} from '../../components';
import '../../components/form-group/style';

const PhoneNumberRegExp = /(^(86|17951)?(1(3|5|6|8)[0-9]|17[0678]|14[57])[0-9]{8}$)/;

@Form.create()
export default class FormGroupExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      disabled: true,
      areaDescription: null,
      defaultFileList: [],
      submitBtnStatue: false,
      chargeMoney: 0,
      formData: {
        startDate: 932847239,
        endDate: 18298384838,
        pathPoints: [],
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        formData: {
          startDate: 932847239,
          endDate: 18298384838,
          pathPoints: [[116.34062782447768, 39.95285096018603], [116.48345615612376, 39.94112635635715], [116.37638779247231, 39.88320338312631]],
        },
      });
    }, 2000);
  }

  handleResponse = () => {

  }

  searchItems = [
    {
      dataIndex: 'name',
      render: () => <InputItem placeholder="请输入配送号/运输公司/处置场名称" />,
    },
    {
      dataIndex: 'dateRange',
      render: () => <DatePicker.RangePicker />,
    },
    {
      dataIndex: 'submit',
      render: () => <Button htmlType="submit" type="primary">搜索</Button>,
    },
  ];

  check = () => {
    console.log('checkcheckcheck');
  }

  basicItems = [
    { label: '公厕名称', dataIndex: 'toiletName', rules: ['required', this.check, { max: 40, message: '公厕名称请不要超过40个字符！' }], hasFeedback: false },
    { label: '公厕图片',
      dataIndex: 'imgUrls',
      render: (text) => {
        return (
          <div>
            {
              text && text.map((item) => {
                return <img key={item} alt="" src={item} width="200" height="120" style={{ marginRight: 10 }} />;
              })
            }
            <FileUpload fileNum={3} uidKey="imgId" accept={['jpg', 'gif', 'png', 'jpeg']} size={6} defaultFileList={this.state.defaultFileList} action="/bis/common/v1/uploadImage" response={this.handleResponse} />
          </div>
        );
      },
    },
    { label: '详情地址',
      dataIndex: 'detailsAddress',
      rules: ['required'],
      render: () => {
        return <PositionInputBox readOnly />;
      },
    },
    { label: '区域',
      dataIndex: 'pathPoints',
      rules: ['required'],
      render: () => {
        return <SelectArea />;
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
      render: () => <TimeInterval
        restrict
        disabled={this.state.disabled}
        defaultValue={[moment('06:00', 'HH:mm'), moment('22:00', 'HH:mm')]}
        // onChange={this.timeOnchange}
      />,
    },
    { label: '创建时间', dataIndex: 'createDate', render: () => <DatePicker /> },
    {
      label: '时间范围',
      dataIndex: 'dateRange',
      initialValue: ({ startDate, endDate }) => (startDate && endDate && [parseInt(startDate), parseInt(endDate)]),
      render: () => <DatePicker.RangePicker />,
    },
    {
      label: '月份',
      dataIndex: 'month',
      render: () => <DatePicker.MonthPicker />,
    },
    { label: '管理员', dataIndex: 'cleanerName' },
    { label: '手机号', dataIndex: 'cleanerPhone', rules: [{ pattern: PhoneNumberRegExp, message: '请填写正确的手机号！' }] },
    { label: '消防设备',
      dataIndex: 'toiletFireProtection',
      defaultValue: '0',
      render: () => <RadioButtonGroup options={[{ label: '灭火器', value: '0' }, { label: '消防栓', value: '1' }]} />,
    },
    { label: '单选测试',
      dataIndex: 'toiletFireProtection',
      defaultValue: '0',
      render: () => <RadioItem items={[{ text: '灭火器', value: '0' }, { text: '消防栓', value: '1' }]} />,
    },
    { label: '附件上传',
      dataIndex: 'btn',
      render: () => <FileUpload listType="attachment" fileNum={3} size={6} action="/bis/common/v1/uploadImage" />,
    },
    { label: '',
      dataIndex: 'btn',
      render: () => <Button htmlType="submit" type="primary">提交</Button>,
    },

  ];

  handleSubmit = (event, values) => {
    const { dateRange: [startDate, endDate] = [], ...rest } = values;
    console.log('handleSubmit', { ...rest, startDate, endDate });
  };

  render() {
    return (
      <Container>
        <Panel>
          <FormGroup layout="inline" items={this.searchItems} onSubmit={this.handleSubmit} />
        </Panel>
        <Panel>
          <FormGroup form={this.props.form} size="lg" items={this.basicItems} dataSource={this.state.formData} onSubmit={this.handleSubmit}>
            <div>
              <a>
            更多分类 <Icon type="down" />
              </a>
            </div>
            <div>
              <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
            </div>
            <div>
              <Button>清空</Button>
            </div>

          </FormGroup>
        </Panel>
      </Container>
    );
  }
}
