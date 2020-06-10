import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CounterAnimation from '../counter-animation';

/**
 * 横向动态信息组件
 * @description 横向展示图标、标题、数量信息
 * @export  DynamicInfoHorizontal
 * @date    2017-09-21
 * @author  zbs
 */
class DynamicInfoHorizontal extends React.Component {
  render() {
    const { prefixCls = 'bis-dynamic-info-horizontal', className } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={this.props.style}>
        <div className={`${prefixCls}-panel`} onClick={(e) => { this.props.onClick && this.props.onClick(e); }} style={{ height: (this.props.style && this.props.style.height), lineHeight: (this.props.style && this.props.style.height) }}>
          <img src={this.props.iconUrl} alt="" />
          <span className={`${prefixCls}-title`}>{ this.props.title }：</span>
          <span>
            <span className={`${prefixCls}-panel-number`}>
              <CounterAnimation delta={this.props.delta} end={this.props.number} />
            </span>
            <span className={`${prefixCls}-panel-unit`}>{this.props.unit}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default DynamicInfoHorizontal;

DynamicInfoHorizontal.defaultProps = {
  className: '',
  style: {},
  title: '',
  onClick: null,
  iconUrl: '',
  number: 0,
  delta: 0,
  unit: '',
};

DynamicInfoHorizontal.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  onClick: PropTypes.func,
  iconUrl: PropTypes.string,
  number: PropTypes.number,
  delta: PropTypes.number,
  unit: PropTypes.string,
};
