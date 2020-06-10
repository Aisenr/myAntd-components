import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CounterAnimation from '../counter-animation';

/**
 * 动态信息卡片组件
 * @description 卡片形式展示图标、标题、数量信息
 * @export  InfoCard
 * @date    2017-10-17
 * @author  zbs
 */
class InfoCard extends React.Component {
  render() {
    const { prefixCls = 'bis-info-card', className } = this.props;
    return (
      <div style={this.props.style} className={classNames(prefixCls, className)} >
        <div className={`${prefixCls}-title`}>
          { this.props.title }
        </div>
        <div className={`${prefixCls}-img`}>
          <img src={this.props.iconUrl} />
        </div>
        <div className={`${prefixCls}-font`}>
          <CounterAnimation end={this.props.number} />
        </div>
      </div>
    );
  }
}

export default InfoCard;

InfoCard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  iconUrl: PropTypes.string,
  number: PropTypes.number,
};
