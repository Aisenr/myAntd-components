import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * 日期、时间格式化
 * @description 日期、时间格式化
 * @export  DateFormat
 * @date    2017-09-21
 * @author  zbs
 */
export default class DateFormat extends React.PureComponent {
  static defaultProps = {
    value: '',
    format: 'YYYY-MM-DD HH:mm:ss',
  }
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    format: PropTypes.string,
  }
  render() {
    const { value, format = 'YYYY-MM-DD HH:mm:ss' } = this.props;
    if (!moment(value).isValid()) {
      console.warn('Invalid date ');
      return '';
    }
    return moment(new Date(value)).format(format);
  }
}
