import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ellipsis from '../ellipsis';
import DateFormat from '../date-format';

/**
 * 消息组件
 * @description 显示消息标题、消息体、日期信息
 * @export  MessageItem
 * @date    2017-09-21
 * @author  zbs
 */
class MessageItem extends React.Component {
  render() {
    const { prefixCls = 'bis-message-item', className } = this.props;
    return (
      <div style={this.props.style} className={classNames(prefixCls, className)} >
        <div className={`${prefixCls}-outer`} >
          <div className={`${prefixCls}-title`} >
            { this.props.title }
          </div>
          <div className={`${prefixCls}-below`} >
            <span className={`${prefixCls}-content`}>
              <Ellipsis value={this.props.content} />
            </span>
            <span className={`${prefixCls}-time`}>
              <DateFormat value={this.props.time} format={'YYYY-MM-DD HH:mm'} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageItem;

MessageItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.number,
};
