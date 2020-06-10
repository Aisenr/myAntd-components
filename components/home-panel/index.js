import React, { Component } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

/**
 * 局部容器组件
 * @description 作为某一局部单元的容器
 * @export  HomePanel
 * @date    2017-09-28
 * @author  zbs
 */
class HomePanel extends Component {
  render() {
    return (
      <div className={this.props.className} style={this.props.style} >
        <div>
          <h4>{this.props.title}</h4>
        </div>
        <div style={{ height: '2px', background: '#bdbdbd', marginTop: '3px', marginBottom: '20px' }} />
        <Card
          bodyStyle={{ padding: 10 }}
          hoverable
          bordered={false}
        >
          { this.props.children }
        </Card>
      </div>
    );
  }
}

export default HomePanel;

HomePanel.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.element,
};
