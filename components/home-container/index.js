import React, { Component } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

/**
 * 容器组件
 * @description 作为其他业务组件的容器组件，可放置子组件
 * @export  Container
 * @date    2017-09-21
 * @author  zbs
 */
class HomeContainer extends Component {
  render() {
    const { className, style, title, bodyStyle = {}, children } = this.props;
    return (
      <div className={className} style={style} >
        <Card
          title={title}
          bodyStyle={{ padding: 10, ...bodyStyle }}
        >
          {children}
        </Card>
      </div>
    );
  }
}

export default HomeContainer;

HomeContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.node,
};
