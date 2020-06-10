import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classNames from 'classnames';
import Ellipsis from '../ellipsis';

/**
 * 表格
 * @description 将内容一表格形式展示
 * @export  ListTable
 * @date    2017-09-28
 * @author  zbs
 */

const themeMap = {
  'square-border': { size: 'large', style: { float: 'none', textAlign: 'center' } },
  'no-border': { style: { float: 'none', textAlign: 'center' } },
};

const prefixCls = 'bis-list-table';
class ListTable extends React.Component {
 
  static defaultProps = {
    className: '',
    style: {},
    columns: [],
    dataSource: [],
    showHeader: true,
    theme: 'square-border',
    zebraCrossing: 'none',
    bordered: false,
  };

  rowClassName = (record, index) => {
    const { zebraCrossing } = this.props;
    if (zebraCrossing === 'even') {
      return index % 2 === 1 ? (`${prefixCls}-odd`) : (`${prefixCls}-even`);
    } else if (zebraCrossing === 'odd') {
      return index % 2 === 0 ? (`${prefixCls}-odd`) : (`${prefixCls}-even`);
    }
  };

  render() {
    const newProps = this.props.pagination ? {
      ...this.props,
      pagination: {
        ...themeMap[this.props.theme],
        ...this.props.pagination,
      },
    } : { ...this.props, pagination: false };
    const columns = this.props.columns && this.props.columns.map((column) => {
      if (column.render) {
        return {
          ...column,
          render: (text, record, index) => {
            return typeof (column.render(text, record, index)) === 'string' ? <Ellipsis value={column.render(text, record, index)} /> : <span className={`${prefixCls}-render`}>{column.render(text, record, index)}</span>;
          },
        };
      } else {
        return {
          ...column,
          render: text => <Ellipsis value={text} />,
        };
      }
    });

    return (
      <Table
        size="middle"
        rowKey={(record) => {
          return newProps.rowKeyIndex && record[newProps.rowKeyIndex];
        }}
        rowClassName={this.rowClassName}
        {...newProps}
        columns={columns}
        className={classNames(prefixCls, this.props.className)}
      />
    );
  }
}

export default ListTable;

ListTable.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  showHeader: PropTypes.bool,
  bordered: PropTypes.bool,
  theme: PropTypes.oneOf(['square-border', 'no-border']),
  zebraCrossing: PropTypes.oneOf(['odd', 'even', 'none']),
};
