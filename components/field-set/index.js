import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class FieldSet extends React.Component {
  render() {
    const { prefixCls = 'bis-field-set', className } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={this.props.style}>
        <Spin spinning={this.props.loading}>
          {
            this.props.title
            &&
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-title`}>
                {this.props.title}
              </div>
              <div className={`${prefixCls}-extra`}>
                {this.props.extra}
              </div>
            </div>
          }
          <div className={`${prefixCls}-children`}>
            {this.props.children}
          </div>
        </Spin>
      </div>
    );
  }
}

FieldSet.defaultProps = {
  className: null,
  loading: false,
};

FieldSet.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default FieldSet;
