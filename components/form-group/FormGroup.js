import React from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import InputItem from '../input-item/index';

const password = (rule, value, callback, label) => {
  if (value === '' || value === undefined) {
    callback(`${label}不能为空`);
  } else {
    callback();
  }
};
const username = (rule, value, callback, label) => {
  if (value === '' || value === undefined) {
    callback(`${label}`);
  } else {
    callback();
  }
};
const phone = (rule, value, callback, label) => {
  if (value === '' || value === undefined) {
    callback(`${label}`);
  } else {
    callback();
  }
};
const confirm = (rule, value, callback, label) => {
  if (value === '' || value === undefined) {
    callback(`${label}`);
  } else {
    callback();
  }
};

const handleDefault = (rule, value, callback) => {
  callback();
};

const handleValidator = (rule, value, callback, type, label) => {
  switch (type) {
    case 'password' :
      return password(rule, value, callback, label);
    case 'username' :
      return username(rule, value, callback, label);
    case 'phone' :
      return phone(rule, value, callback, label);
    case 'confirm' :
      return confirm(rule, value, callback, label);
    default:
      return handleDefault(rule, value, callback, label);
  }
};

const rulesLookUpTable = (item, itemRule) => {
  switch (itemRule) {
    case 'required' :
      return { required: true, message: `${item.label}不能为空` };
    case 'email' :
      return { type: 'email', message: `${item.label}格式不正确` };
    default:
      return null;
  }
};

/**
 * 表单
 * @description 表单
 * @export  FormGroup
 * @date    2017-09-28
 * @author  zbs
 */
export default class FormGroup extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'two-column-wrap', 'three-column-wrap']),
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      dataIndex: PropTypes.string,
      initialValue: PropTypes.any,
      defaultValue: PropTypes.any,
      render: PropTypes.func,
      rules: PropTypes.array,
      hasFeedback: PropTypes.bool,
      size: PropTypes.oneOf([undefined, 'two-column-wrap-item-span-2', 'three-column-wrap-item-span-2', 'three-column-wrap-item-span-3']),
    })),
    dataSource: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    layout: PropTypes.string,
  };

  static defaultProps = {
    items: [],
    dataSource: {},
    size: 'lg',
    rules: [],
    formLayout: { sm: 24 },
    formMaxWidth: {
      sm: { maxWidth: '360px' },
      md: { maxWidth: '540px' },
      lg: { maxWidth: '1080px' },
      'two-column-wrap': { maxWidth: '1080px' },
      'three-column-wrap': { maxWidth: '1920px' },
    },
    formColumnSpans: {
      'two-column-wrap': { md: 12, sm: 24 },
      'two-column-wrap-item-span-2': { md: 24, sm: 24 },
      'three-column-wrap': { lg: 8, md: 12, sm: 24 },
      'three-column-wrap-item-span-2': { lg: 16, md: 24, sm: 24 },
      'three-column-wrap-item-span-3': { lg: 24, md: 24, sm: 24 },
    },
    formItemSpans: {
      sm: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 9 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 },
        },
      },
      md: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      },
      lg: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      'two-column-wrap': {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
          md: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
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

  getRules(item) {
    const { rules = [] } = item;
    return rules.map((itemRule) => {
      if (typeof (itemRule) === 'object' || typeof (itemRule) === 'function') {
        return itemRule;
      }
      const result = rulesLookUpTable(item, itemRule);
      if (result) {
        return result;
      }
      return { validator: (rule, value, callback) => handleValidator(rule, value, callback, itemRule, item.label) };
    });
  }

  getFormItemLayout(layout, item) {
    if (layout === 'inline') {
      return;
    }

    const formItemLayout = this.props.formItemSpans[item.size || this.props.size];
    if (item.label) {
      return formItemLayout;
    } else {
      const wrapperCol = {};
      Object.keys(formItemLayout.wrapperCol).forEach((key) => {
        if (formItemLayout.labelCol[key]) {
          wrapperCol[key] = {
            ...formItemLayout.wrapperCol[key],
            offset: key === 'xs' ? 0 : formItemLayout.labelCol[key].span,
          };
        }
      });
      return { wrapperCol };
    }
  }

  getItemInitialValue(item) {
    const { initialValue } = item;
    if (initialValue) {
      return typeof initialValue === 'function' ? initialValue(this.props.dataSource) : initialValue;
    } else {
      return get(this.props.dataSource, item.dataIndex, item.defaultValue);
    }
  }

  getFormItem(item, index) {
    const { getFieldDecorator } = this.props.form;
    const { layout, dataSource } = this.props;
    const rules = this.getRules(item);
    const initialValue = this.getItemInitialValue(item);
    const input = item.render ? item.render(initialValue, dataSource, index) : <InputItem />;
    if (!input) {
      getFieldDecorator(item.dataIndex, { initialValue, rules });
      return null;
    }

    return (
      <Form.Item
        key={item.dataIndex}
        hasFeedback={item.hasFeedback || false}
        label={item.label}
        {...this.getFormItemLayout(layout, item)}
      >
        {getFieldDecorator(item.dataIndex, { initialValue, rules })(input)}
      </Form.Item>
    );
  }

  render() {
    const { className, layout, items, children } = this.props;
    const style = layout === 'inline' ? this.props.style : {
      ...this.props.formMaxWidth[this.props.size],
      ...this.props.style,
    };

    return (
      <div className={className} style={style} >
        {layout === 'inline' && items.map((item, index) => this.getFormItem(item, index))}
        {layout !== 'inline' && (
          <Row gutter={16}>
            {items.map((item, index) => (
              <Col key={item.dataIndex} {...this.props.formColumnSpans[item.size || this.props.size]}>
                {this.getFormItem(item, index)}
              </Col>
            ))}
          </Row>
        )}
        {children}
      </div>
    );
  }
}
