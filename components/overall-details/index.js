import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 整体详情组件
 * @description 包含轮播、key-value详情与介绍信息
 * @export  OverallDetails
 * @date    2017-09-21
 * @author  zbs
 */
class OverallDetails extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    introduction: PropTypes.string,
    children: PropTypes.array,
    introductionTitle: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    style: { margin: '20px' },
    introductionTitle: '',
    introduction: '',
    children: [],
    title: '',
  }

  render() {
    const { prefixCls = 'bis-overall-details', className } = this.props;
    return (
      <Card
        {...this.props}
        className={classNames(prefixCls, className)}
      >
        <div>
          <div className={`${prefixCls}-childrenOne`}>
            {this.props.children[0]}
          </div>
          <div className={`${prefixCls}-childrenTwo`}>
            {this.props.children[1]}
          </div>
        </div>
        <div className={`${prefixCls}-introductionContainer`}>
          {(this.props.introductionTitle || this.props.introduction) &&
          <div>
            <div className={`${prefixCls}-space`} />
            <div className={`${prefixCls}-introductionTitle`} >
              {this.props.introductionTitle}
            </div>
            <div className={`${prefixCls}-introduction`} >
              { this.props.introduction }
            </div>
          </div>
          }
        </div>
      </Card>
    );
  }
}

export default OverallDetails;
