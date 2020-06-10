import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

export default class RangeFormat extends React.PureComponent {
  static defaultProps = {
    value: [],
    format: 'YYYY-MM-DD',
  }
  render() {
    const { prefixCls = 'bis-date-format', className, style, value, format } = this.props;
    if (value.length <= 0) {
      return '';
    }
    return (
      <span className={classNames(prefixCls, className)} style={style} >
        {moment(new Date(value[0])).format(format)}<span className={`${prefixCls}-interval`}>至</span>{moment(new Date(value[1])).format(format)}
      </span>
    );
  }
}
