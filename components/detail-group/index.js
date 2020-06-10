import React from 'react';
import classNames from 'classnames';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import get from 'lodash.get';

/**
 * 详情组件
 * @description key-value形式的详情信息（一列）
 * @export  DetailsKeyValue
 * @date    2017-09-28
 * @author  zbs
 */
export default class DetailGroup extends React.PureComponent {

  static defaultProps = {
    size: 'two-column-wrap',
    items: [],
    dataSource: {},
    columnSpans: {
      'two-column-wrap': { md: 12, sm: 24 },
      'two-column-wrap-item-span-2': { md: 24, sm: 24 },
      'three-column-wrap': { lg: 8, md: 12, sm: 24 },
      'three-column-wrap-item-span-2': { lg: 16, md: 24, sm: 24 },
      'three-column-wrap-item-span-3': { lg: 24, md: 24, sm: 24 },
    },
    mapMaxWidth: {
      sm: { maxWidth: '360px' },
      md: { maxWidth: '540px' },
      lg: { maxWidth: '1080px' },
      'two-column-wrap': { maxWidth: '1080px' },
      'three-column-wrap': { maxWidth: '1920px' },
    },
    mapColumnSpans: {
      sm: {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
      },
      md: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      lg: {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 },
        },
      },
      'two-column-wrap': {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 4 },
          md: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 20 },
          md: { span: 16 },
        },
      },
      'two-column-wrap-item-span-2': {
        labelCol: {
          sm: { span: 4 },
        },
        wrapperCol: {
          sm: { span: 20 },
        },
      },
      'three-column-wrap': {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
          md: { span: 8 },
          lg: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
          md: { span: 16 },
          lg: { span: 18 },
        },
      },
      'three-column-wrap-item-span-2': {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
          md: { span: 4 },
          lg: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
          md: { span: 16 },
          lg: { span: 21 },
        },
      },
      'three-column-wrap-item-span-3': {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
          md: { span: 4 },
          lg: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
          md: { span: 16 },
          lg: { span: 22 },
        },
      },
    },
  };

  static propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'two-column-wrap', 'three-column-wrap']),
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.object,
      label: PropTypes.string,
      dataIndex: PropTypes.string,
      render: PropTypes.func,
      size: PropTypes.oneOf([undefined, 'two-column-wrap-item-span-2', 'three-column-wrap-item-span-2', 'three-column-wrap-item-span-3']),
    })),
    dataSource: PropTypes.object,
    columnSpans: PropTypes.object,
  };

  getItemValueNode = (item, index) => {
    const value = get(this.props.dataSource, item.dataIndex, item.defaultValue);
    if (item.render) {
      const result = item.render(value, this.props.dataSource, index);
      return result == null ? '' : result;
    }
    return value && value.toString();
  };

  render() {
    const { prefixCls = 'bis-detail-group', className } = this.props;
    const style = {
      ...this.props.mapMaxWidth[this.props.size],
      ...this.props.style,
    };

    return (
      <div className={classNames(prefixCls, className)} style={style} >
        <Row gutter={16}>
          {
            this.props.items.map((item, index) => {
              const itemValueNode = this.getItemValueNode(item, index);
              const columnItemSpans = this.props.mapColumnSpans[item.size || this.props.size];
              return (
                <Col key={item.key || index} {...this.props.columnSpans[item.size || this.props.size]}>
                  <Row className={`${prefixCls}-row`}>
                    <Col {...columnItemSpans.labelCol} className={`${prefixCls}-label`} >
                      { item.label }
                    </Col>
                    <Col {...columnItemSpans.wrapperCol} className={`${prefixCls}-text`}>
                      {itemValueNode}
                      {itemValueNode && item.unit && <span style={{ paddingLeft: '3px' }}>{item.unit}</span>}
                    </Col>
                  </Row>
                </Col>
              );
            })
          }
        </Row>
      </div>
    );
  }
}
