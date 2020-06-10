import React, { Component } from 'react';
import { Card, Spin } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 局部容器组件
 * @description 作为某一局部单元的容器
 * @export  Panel
 * @date    2017-09-28
 * @author  zbs
 */
export default class Panel extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    children: PropTypes.node,
    extra: PropTypes.node,
    loading: PropTypes.bool,
    bodyStyle: PropTypes.object,
    cardStyle: PropTypes.object,
  }

  static defaultProps = {
    bodyStyle: {},
    loading: false,
  }
  render() {
    const { prefixCls = 'bis-panel', className, style, loading, bodyStyle, title, extra, cardStyle, children } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={style} >
        <Spin spinning={loading}>
          <Card
            bodyStyle={bodyStyle}
            title={title}
            extra={extra}
            style={cardStyle}
          >
            { children }
          </Card>
        </Spin>
      </div>
    );
  }
}
