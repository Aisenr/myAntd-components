import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CounterAnimation from '../counter-animation';
import NumbersDynamicUp from '../numbers-dynamic-up';
import Ellipsis from '../ellipsis';

/**
 * 纵向动态信息组件
 * @description 纵向展示图标、标题、数量信息
 * @export  DynamicInfoVertical
 * @date    2017-09-21
 * @author  zbs
 */
class DynamicInfoVertical extends React.Component {
  render() {
    const { prefixCls = 'bis-dynamic-info-vertical', className } = this.props;
    return (
      <div style={this.props.style} className={classNames(prefixCls, className)} onClick={this.props.onClick}>
        <div className={`${prefixCls}-img`}>
          <img src={this.props.iconUrl} alt={this.props.alt || ''} />
        </div>
        <div className={`${prefixCls}-title`}>
          <Ellipsis value={this.props.title} />
        </div>
        <div className={`${prefixCls}-font`} style={this.props.style.color ? {} : { color: '#0a40a0' }}>
          {
            this.props.showDifference
            ?
              <CounterAnimation end={this.props.number} />
            :
              <NumbersDynamicUp end={this.props.number} />
          }
        </div>
      </div>
    );
  }
}

export default DynamicInfoVertical;

DynamicInfoVertical.defaultProps = {
  showDifference: true,
  className: '',
  style: {},
  title: '',
  iconUrl: '',
  number: 0,
  alt: '',
};

DynamicInfoVertical.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  iconUrl: PropTypes.string,
  number: PropTypes.number,
  showDifference: PropTypes.bool,
  alt: PropTypes.string,
};
