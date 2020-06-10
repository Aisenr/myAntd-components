import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tag, Modal, Tabs, Row, Col } from 'antd';
import options, { areaOptions, cityOptions, getObj } from '../area-select/cascader-address-options';
import ParseCode from '../parse-code';

const TabPane = Tabs.TabPane;

const prefixCla = 'bis-area-select-modal';

const heights = {
  sm: '24px',
  md: '32px',
  lg: '40px',
};

const decorationProvinceName = (name) => {
  return name.substring(0, name.indexOf('省')) || name.substring(0, name.indexOf('市')) || name.substring(0, 2);
};

export default class AreaSelectModal extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    restrict: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.oneOf(['single', 'multiple']),
    toFinal: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    style: {},
    placeholder: '点击选择区域',
    restrict: null,
    size: 'md',
    value: [],
    type: 'single',
    toFinal: false,
    onChange() {},
  };

  constructor(props) {
    super(props);
    const panes = [
      { title: ParseCode.getPCA(props.restrict) || '全国',
        content: this.getContent(props.restrict),
        key: '0',
      },
    ];
    const PCATag = this.getTag(props.value);
    this.state = {
      text: (!props.value || props.value.length === 0) ? <span style={{ display: 'inline-block', margin: '3px 0 3px 5px' }}>{props.placeholder}</span> : PCATag,
      visible: false,
      checkedArea: PCATag,
      checkedCode: props.value,
      activeKey: '0',
      panes,
    };
  }

  componentWillReceiveProps(nextProps) {
    const panes = [
      { title: ParseCode.getPCA(nextProps.restrict) || '全国',
        content: this.getContent(nextProps.restrict),
        key: '0',
      },
    ];
    const PCATag = this.getTag(nextProps.value);
    this.setState({
      text: (!nextProps.value || nextProps.value.length === 0) ? <span style={{ display: 'inline-block', margin: '3px 0 3px 5px' }}>{nextProps.placeholder}</span> : PCATag,
      checkedArea: PCATag,
      checkedCode: nextProps.value,
      panes,
    });
  }

  getContent = (restrict) => {
    const { options: selfOptions } = this.props;
    if (!restrict) return this.provinces();
    if (restrict.length === 2) return this.cities(selfOptions || getObj(restrict));
    if (restrict.length === 4) return this.areas(selfOptions || getObj(restrict));
    return this.provinces();
  }

  getTag = (codes) => {
    return (
      <div>
        {
          codes.map((code) => {
            return (<Tag
              closable
              onClose={e => this.handleTagClose(e, code)}
              style={{ marginRight: '4px', marginTop: '3px', borderRadius: '2px', height: '24px' }}
            >
              {code === '' ? '全国' : ParseCode.getPCA(code)}
            </Tag>);
          })
        }
      </div>
    );
  }

  provinces = () => {
    const { options: selfOptions } = this.props;
    return (
      <div>
        {/* <span style={{ fontWeight: 'bold' }}>热门城市</span> */}
        {/* <Row> */}
        {/* {hostCity.map((item) => { */}
        {/* return <Col span={4}>{item.label}</Col>; */}
        {/* })} */}
        {/* </Row> */}
        { !this.props.toFinal && <span className={`${prefixCla}-supLabel`} onClick={this.handleNationalClick}>全国</span>}
        <Row className={`${prefixCla}-row`} >
          {(selfOptions || options).map((item) => {
            return <Col span={4} className={`${prefixCla}-col`} ><span onClick={() => this.handleProvinceClick(item)}>{decorationProvinceName(item.label)}</span></Col>;
          })}
        </Row>
      </div>
    );
  };

  cities = (province) => {
    return (
      <div>
        { !this.props.toFinal && <span className={`${prefixCla}-supLabel`} onClick={() => this.handleSupLabelClick(province)}>{province.label}</span>}
        <Row className={`${prefixCla}-row`} >
          {province.children && cityOptions(province.value).map((item) => {
            return <Col key={item.value} span={4} className={`${prefixCla}-col`} ><span onClick={() => this.handleCityClick(item)}>{item.label}</span></Col>;
          })}
        </Row>
      </div>
    );
  };

  areas = (city) => {
    return (
      <div>
        { !this.props.toFinal && <span className={`${prefixCla}-supLabel`} onClick={() => this.handleSupLabelClick(city)}>{city.label}</span>}
        <Row className={`${prefixCla}-row`} >
          {city.children && areaOptions(city.value).map((item) => {
            return <Col key={item.value} span={4} className={`${prefixCla}-col`} ><span onClick={() => this.handleAreaClick(item)}>{item.label}</span></Col>;
          })}
        </Row>
      </div>
    );
  };

  handleNationalClick = () => {
    const newPanes = this.state.panes.slice(0, 1);
    this.setState({
      panes: newPanes,
      activeKey: '0',
      checkedArea: this.getTag(['']),
      checkedCode: [''],
    });
  }

  handleSupLabelClick = (item) => {
    const { checkedCode } = this.state;
    const newCheckedCode = checkedCode.filter((code) => {
      return code.indexOf(item.value) === -1;
    });
    const newPanes = this.state.panes.slice(0, 1);
    this.setState({
      panes: newPanes,
      activeKey: '0',
      checkedArea: this.getTag([...newCheckedCode, item.value]),
      checkedCode: [...newCheckedCode, item.value],
    });
  }

  add = (item) => {
    const panes = [...this.state.panes];
    const activeKey = this.state.panes.length;
    item.value.length === 2 && panes.push({ title: item.label, content: this.cities(item), key: `${activeKey}` });
    item.value.length === 4 && panes.push({ title: item.label, content: this.areas(item), key: `${activeKey}` });
    this.setState({ panes, activeKey: `${activeKey}` });
  }

  handleProvinceClick = (item) => {
    const { type } = this.props;
    const { checkedCode } = this.state;
    let newCheckedCode;
    if (type === 'multiple') {
      // newCheckedCode = [...checkedCode, item.value];
      // for (const code of checkedCode) {
      //   if (code.includes(item.value)) newCheckedCode = checkedCode; break;
      // }
      newCheckedCode = checkedCode.map((code) => {
        if (code.includes(item.value)) return code;
        if (item.value.includes(code)) return item.value;
        return code;
      });
    } else {
      newCheckedCode = [item.value];
    }
    this.add(item);
    this.setState({
      // checkedArea: this.getTag(newCheckedCode),
      // checkedCode: newCheckedCode,
    });
  }

  handleCityClick = (item) => {
    const { type } = this.props;
    const { checkedCode } = this.state;
    let newCheckedCode;
    if (type === 'multiple') {
      // newCheckedCode = [...checkedCode, item.value];
      newCheckedCode = checkedCode.map((code) => {
        if (code.includes(item.value)) return code;
        if (item.value.includes(code)) return item.value;
        return code;
      });
      // for (const code of checkedCode) {
      //   if (code.includes(item.value) || item.value.includes(code)) newCheckedCode = checkedCode; break;
      // }
      // if (newCheckedCode.length = checkedCode.length) {
      //   newCheckedCode = checkedCode.filter((code) => {
      //     return !item.value.includes(code);
      //   })
      // }
    } else {
      newCheckedCode = [item.value];
    }
    this.add(item);
    this.setState({
      // checkedArea: this.getTag(newCheckedCode),
      // checkedCode: newCheckedCode,
    });
  }

  handleAreaClick = (item) => {
    const { type } = this.props;
    const { checkedCode } = this.state;
    let newCheckedCode;
    if (type === 'multiple') {
      newCheckedCode = [...checkedCode, item.value];
      for (const code of checkedCode) {
        if (item.value.includes(code)) {
          newCheckedCode = checkedCode;
          break;
        }
      }
      if (newCheckedCode.length === checkedCode.length) {
        newCheckedCode = checkedCode.map((code) => {
          if (code.includes(item.value)) return code;
          if (item.value.includes(code)) return item.value;
          return code;
        });
      }
    } else {
      newCheckedCode = [item.value];
    }
    const newPanes = this.state.panes.slice(0, 1);
    this.setState({
      panes: newPanes,
      activeKey: '0',
      checkedArea: this.getTag(newCheckedCode),
      checkedCode: newCheckedCode,
    });
  }

  handleTagClose = (e, code) => {
    e.preventDefault();
    e.stopPropagation();
    const { checkedCode } = this.state;
    const newCheckedCode = checkedCode.filter((item) => {
      return item !== code;
    });
    this.setState({
      checkedArea: this.getTag(newCheckedCode),
      checkedCode: newCheckedCode,
    });
    this.props.onChange(newCheckedCode);
  }

  handleClick = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const { checkedCode } = this.state;
    const { onChange } = this.props;
    this.setState({
      visible: false,
    });
    onChange(checkedCode);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleTabClick = (e) => {
    const newPanes = this.state.panes.slice(0, parseInt(e) + 1);
    this.setState({
      panes: newPanes,
      activeKey: e,
    });
  }

  render() {
    const { className, style, size } = this.props;
    const { text, checkedArea } = this.state;
    return (
      <div className={classNames(prefixCla, className)} style={style}>
        <div
          className={`${prefixCla}-selectDiv`}
          style={{ minHeight: heights[size] }}
          onClick={this.handleClick}
        >
          <span>
            {text}
          </span>
        </div>
        <Modal
          title="区域选择"
          width={700}
          bodyStyle={{ minHeight: 363 }}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className={`${prefixCla}-checked`}>
            <label>选中区域：</label><span>{checkedArea}</span>
          </div>
          <Tabs
            type="card"
            activeKey={this.state.activeKey}
            onTabClick={this.handleTabClick}
          >
            {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
          </Tabs>
        </Modal>
      </div>
    );
  }
}
