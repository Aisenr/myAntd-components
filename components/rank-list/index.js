import React from 'react';
import { Card, Spin } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid/v4';
import Ellipsis from '../ellipsis';
import NumberFormat from '../number-format';

/**
 * 排行列表组件
 * @description 对列表进行排名显示
 * @export  RankList
 * @createDate    2017-09-21
 * @modifyDate    2018-06-07
 * @author  zbs
 */
export default class RankList extends React.Component {

  static propTypes = {
    ...Card.propTypes,
    bordered: PropTypes.bool,
    defaultValue: PropTypes.string,
    dataSource: PropTypes.array,
    onRowClick: PropTypes.func,
    onExtraClick: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    bordered: false,
    dataSource: [],
    defaultValue: '暂无数据',
    onRowClick() {},
    onExtraClick() {},
  };
  render() {
    const { prefixCls = 'bis-rank-list', className, style, loading, title, extra, onExtraClick, bodyStyle, dataSource, onRowClick, defaultValue, ...rest } = this.props;
    return (
      <div style={style} className={classNames(prefixCls, className)} >
        <Spin spinning={loading}>
          <Card
            title={title}
            extra={
              extra && <span className={`${prefixCls}-extra`} onClick={onExtraClick} >
                {extra}
              </span>
            }
            bodyStyle={{ padding: '10px', ...bodyStyle }}
            {...rest}
          >
            {dataSource.length > 0
              ? <ul className={`${prefixCls}-ulcla`}>
                {
                  dataSource.map((item, index) => {
                    return (
                      <li key={item.key || uuid()} className={`${prefixCls}-li`}>
                        <div onClick={e => onRowClick(item, index, e)}>
                          <span className={`${prefixCls}-ranking`}>
                            <span className={`${prefixCls}-ulcla-index`}>{index + 1}</span>
                          </span>
                          <span className={`${prefixCls}-content`}>
                            <Ellipsis value={item.content} />
                          </span>
                          <span className={`${prefixCls}-unit-number`}>
                            <span className={`${prefixCls}-number`} ><NumberFormat value={item.number} /></span>
                            <span className={`${prefixCls}-unit`} >{ item.unit }</span>
                          </span>
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
              :
              <div className={`${prefixCls}-defaultValue`}>{defaultValue}</div>
            }
          </Card>
        </Spin>
      </div>
    );
  }
}
