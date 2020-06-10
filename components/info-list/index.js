import React from 'react';
import { Card, Spin } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ellipsis from '../ellipsis';

/**
 * 详情组件
 * @description 显示图片、标题、副标题、描述等信息
 * @export  InfoList
 * @date    2017-09-21
 * @author  zbs
 */
class InfoList extends React.Component {
  render() {
    const { prefixCls = 'bis-info-list', className } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={this.props.style} >
        <Spin spinning={this.props.loading}>
          <Card
            title={this.props.title}
            extra={
              <span className={`${prefixCls}-extra`} onClick={(e) => { this.props.onExtraClick && this.props.onExtraClick(e); }} >
                {this.props.extra || '更多'}
              </span>
            }
            hoverable
            bodyStyle={{ ...this.props.bodyStyle }}
            bordered={false}
          >
            {(this.props.dataSource && this.props.dataSource.length > 0)
              ? <ul>
                {
                  this.props.dataSource.map((item, index) => {
                    return (
                      <li key={item.key || index} className={`${prefixCls}-li`}>
                        <a onClick={(e) => { this.props.onRowClick && this.props.onRowClick(item, index, e); }}>
                          <span className={`${prefixCls}-img`} style={item.imageUrl ? null : { width: 0 }}>
                            {item.imageUrl && <img src={item.imageUrl} alt="" />}
                          </span>
                          <span className={`${prefixCls}-right`} style={item.imageUrl ? null : { width: '100%' }}>
                            <span className={`${prefixCls}-title`}>
                              <Ellipsis value={item.title} />
                            </span>
                            {
                              item.subtitle && (
                                <span>
                                  <Ellipsis value={item.subtitle} />
                                </span>
                              )
                            }
                            {
                              item.subtitle ? (
                                <span>
                                  <Ellipsis value={item.detail} />
                                </span>
                              ) : (
                                item.imageUrl ? <span className={`${prefixCls}-detail`}>{item.detail}</span> :
                                <Ellipsis value={item.detail} />
                              )
                            }
                          </span>
                        </a>
                      </li>
                    );
                  })
                }
              </ul>
              :
              <div style={{ width: '100%', textAlign: 'center', color: 'rgba(0,0,0,0.43)' }}>暂无数据</div>
            }
          </Card>
        </Spin>
      </div>
    );
  }
}

export default InfoList;

InfoList.defaultProps = {
  loading: false,
};

InfoList.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  onExtraClick: PropTypes.func,
  extra: PropTypes.string,
  dataSource: PropTypes.array,
  onRowClick: PropTypes.func,
};
