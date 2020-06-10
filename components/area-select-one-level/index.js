import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col, Popover, Icon } from 'antd';
import regionParse from './regionParse';

const prefixCla = 'bis-area-select-one-level';

const heights = {
  sm: '24px',
  md: '32px',
  lg: '40px',
};

export default class AreaSelectModal extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    size: PropTypes.string,
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
    this.state = {
      visible: false,
      downShow: true,
      upShow: false,
      closeShow: false,
    };
  }

  handleClick = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
      downShow: visible,
      upShow: !visible,
    });
  }

  handleCityClick = (item) => {
    const { onChange } = this.props;
    this.setState({
      chooseContent: item.label,
      visible: false,
      downShow: true,
      upShow: false,
    });
    onChange([item.value]);
  }

  items = () => {
    const { regionRestrict } = this.props;
    const newOptions = regionParse(regionRestrict);
    return (
      <div>
        <Row className={`${prefixCla}-row`} >
          {
            newOptions.map((item) => {
              return <Col key={item.value} span={4} className={`${prefixCla}-col`} ><span onClick={() => this.handleCityClick(item)}>{item.label}</span></Col>;
            })
          }
        </Row>
      </div>
    );
  };

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
      downShow: !visible,
      upShow: visible,
    });
  }

  handleCloseClick = (e) => {
    this.setState({
      chooseContent: '',
    });
    const { onChange } = this.props;
    onChange([]);
    e.stopPropagation();
  }

  handleDownClick = () => {
    const { visible } = this.state;
    this.setState({
      upShow: !visible,
      downShow: visible,
    });
  }

  handleUpClick = () => {
    const { visible } = this.state;
    this.setState({
      upShow: !visible,
      downShow: visible,
    });
  }

  handleMouseOver = () => {
    const { chooseContent } = this.state;
    this.setState({
      closeShow: chooseContent,
      downShow: !chooseContent,
    });
  }

  handleMouseOut = () => {
    this.setState({
      closeShow: false,
      downShow: true,
    });
  }

  render() {
    const { className, style, size, placeholder } = this.props;
    const { visible, chooseContent, downShow, upShow, closeShow } = this.state;
    return (
      <div className={classNames(prefixCla, className)} style={style}>
        <Popover
          placement="bottomLeft"
          overlayStyle={{ width: '640px' }}
          content={this.items()}
          trigger="click"
          visible={visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <div
            className={`${prefixCla}-selectDiv`}
            style={{ minHeight: heights[size], lineHeight: heights[size] }}
            onClick={this.handleClick}
          >
            {
              chooseContent ? <span className={`${prefixCla}-selectDiv-chooseContent`}>{chooseContent}</span> : placeholder
            }
            {downShow && <Icon type="down" className={`${prefixCla}-selectDiv-down`} onClick={this.handleDownClick} onMouseOver={this.handleMouseOver} />}
            {upShow && <Icon type="up" className={`${prefixCla}-selectDiv-up`} onClick={this.handleUpClick} />}
            {closeShow && <Icon type="close-circle" className={`${prefixCla}-selectDiv-close`} onClick={this.handleCloseClick} onMouseOut={this.handleMouseOut} /> }
          </div>
        </Popover>
      </div>
    );
  }
}
