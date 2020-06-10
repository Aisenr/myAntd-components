import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 头像组件
 * @description 显示头像
 * @export  HeadPortrait
 * @date    2017-09-21
 * @author  zbs
 */
class HeadPortrait extends React.Component {
  render() {
    const { prefixCls = 'bis-head-portrait', className } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={this.props.style} >
        <div className={`${prefixCls}img`} style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size && this.props.size / 2, overflow: 'hidden' }} >
          <img alt="" src={this.props.imageUrl || this.props.defalutImg || '/images/index/default.png'} style={{ width: this.props.size, height: this.props.size }} />
        </div>
      </div>
    );
  }
}

export default HeadPortrait;

HeadPortrait.defaultProps = {
  size: 120,
};

HeadPortrait.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.number,
  imageUrl: PropTypes.string,
};
