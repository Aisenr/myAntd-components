import React from 'react';
import { Card, Spin } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DateFormat from '../date-format';
import Ellipsis from '../ellipsis';

/**
 * News组件
 * @description 显示新闻、政策、公告等信息列表
 * @export  NewsPanel
 * @date    2017-09-21
 * @author  zbs
 */
class NewsPanel extends React.Component {
  render() {
    const { prefixCls = 'bis-news-panel', className } = this.props;
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
            bordered={false}
            bodyStyle={{ ...this.props.bodyStyle }}
          >
            {
              (this.props.dataSource && this.props.dataSource.length > 0)
                ?
                  <ul>
                    {
                      this.props.dataSource.map((item, index) => {
                        return (
                          <li key={item.key || index} className={`${prefixCls}-li`}>
                            <a onClick={(e) => { this.props.onRowClick && this.props.onRowClick(item, index, e); }}>
                              <span className={`${prefixCls}-content`}>
                                <Ellipsis value={item.content} />
                              </span>
                              <span className={`${prefixCls}-date`} >
                                <DateFormat value={item.date} format="YYYY-MM-DD" />
                              </span>
                            </a>
                          </li>
                        );
                      })
                    }
                  </ul>
                :
                  <span style={{ textAlign: 'center', color: 'rgba(0,0,0,0.43)' }}>暂无数据</span>
            }
          </Card>
        </Spin>
      </div>
    );
  }
}

export default NewsPanel;

NewsPanel.defaultProps = {
  loading: false,
};

NewsPanel.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  dataSource: PropTypes.array,
  extra: PropTypes.string,
  onExtraClick: PropTypes.func,
  onRowClick: PropTypes.func,
};
