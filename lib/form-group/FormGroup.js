'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

require('antd/lib/row/style');

require('antd/lib/col/style');

require('antd/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('../input-item/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var password = function password(rule, value, callback, label) {
  if (value === '' || value === undefined) {
    callback(label + '\u4E0D\u80FD\u4E3A\u7A7A');
  } else {
    callback();
  }
};
var username = function username(rule, value, callback, label) {
  if (value === '' || value === undefined) {
    callback('' + label);
  } else {
    callback();
  }
};
var phone = function phone(rule, value, callback, label) {
  if (value === '' || value === undefined) {
    callback('' + label);
  } else {
    callback();
  }
};
var confirm = function confirm(rule, value, callback, label) {
  if (value === '' || value === undefined) {
    callback('' + label);
  } else {
    callback();
  }
};

var handleDefault = function handleDefault(rule, value, callback) {
  callback();
};

var handleValidator = function handleValidator(rule, value, callback, type, label) {
  switch (type) {
    case 'password':
      return password(rule, value, callback, label);
    case 'username':
      return username(rule, value, callback, label);
    case 'phone':
      return phone(rule, value, callback, label);
    case 'confirm':
      return confirm(rule, value, callback, label);
    default:
      return handleDefault(rule, value, callback, label);
  }
};

var rulesLookUpTable = function rulesLookUpTable(item, itemRule) {
  switch (itemRule) {
    case 'required':
      return { required: true, message: item.label + '\u4E0D\u80FD\u4E3A\u7A7A' };
    case 'email':
      return { type: 'email', message: item.label + '\u683C\u5F0F\u4E0D\u6B63\u786E' };
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
var FormGroup = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(FormGroup, _React$Component);

  function FormGroup() {
    (0, _classCallCheck3.default)(this, FormGroup);
    return (0, _possibleConstructorReturn3.default)(this, (FormGroup.__proto__ || (0, _getPrototypeOf2.default)(FormGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(FormGroup, [{
    key: 'getRules',
    value: function getRules(item) {
      var _item$rules = item.rules,
          rules = _item$rules === undefined ? [] : _item$rules;

      return rules.map(function (itemRule) {
        if ((typeof itemRule === 'undefined' ? 'undefined' : (0, _typeof3.default)(itemRule)) === 'object' || typeof itemRule === 'function') {
          return itemRule;
        }
        var result = rulesLookUpTable(item, itemRule);
        if (result) {
          return result;
        }
        return { validator: function validator(rule, value, callback) {
            return handleValidator(rule, value, callback, itemRule, item.label);
          } };
      });
    }
  }, {
    key: 'getFormItemLayout',
    value: function getFormItemLayout(layout, item) {
      if (layout === 'inline') {
        return;
      }

      var formItemLayout = this.props.formItemSpans[item.size || this.props.size];
      if (item.label) {
        return formItemLayout;
      } else {
        var wrapperCol = {};
        (0, _keys2.default)(formItemLayout.wrapperCol).forEach(function (key) {
          if (formItemLayout.labelCol[key]) {
            wrapperCol[key] = (0, _extends3.default)({}, formItemLayout.wrapperCol[key], {
              offset: key === 'xs' ? 0 : formItemLayout.labelCol[key].span
            });
          }
        });
        return { wrapperCol: wrapperCol };
      }
    }
  }, {
    key: 'getItemInitialValue',
    value: function getItemInitialValue(item) {
      var initialValue = item.initialValue;

      if (initialValue) {
        return typeof initialValue === 'function' ? initialValue(this.props.dataSource) : initialValue;
      } else {
        return (0, _lodash2.default)(this.props.dataSource, item.dataIndex, item.defaultValue);
      }
    }
  }, {
    key: 'getFormItem',
    value: function getFormItem(item, index) {
      var getFieldDecorator = this.props.form.getFieldDecorator;
      var _props = this.props,
          layout = _props.layout,
          dataSource = _props.dataSource;

      var rules = this.getRules(item);
      var initialValue = this.getItemInitialValue(item);
      var input = item.render ? item.render(initialValue, dataSource, index) : _react2.default.createElement(_index2.default, null);
      if (!input) {
        getFieldDecorator(item.dataIndex, { initialValue: initialValue, rules: rules });
        return null;
      }

      return _react2.default.createElement(
        _form2.default.Item,
        (0, _extends3.default)({
          key: item.dataIndex,
          hasFeedback: item.hasFeedback || false,
          label: item.label
        }, this.getFormItemLayout(layout, item)),
        getFieldDecorator(item.dataIndex, { initialValue: initialValue, rules: rules })(input)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          layout = _props2.layout,
          items = _props2.items,
          children = _props2.children;

      var style = layout === 'inline' ? this.props.style : (0, _extends3.default)({}, this.props.formMaxWidth[this.props.size], this.props.style);

      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        layout === 'inline' && items.map(function (item, index) {
          return _this2.getFormItem(item, index);
        }),
        layout !== 'inline' && _react2.default.createElement(
          _row2.default,
          { gutter: 16 },
          items.map(function (item, index) {
            return _react2.default.createElement(
              _col2.default,
              (0, _extends3.default)({ key: item.dataIndex }, _this2.props.formColumnSpans[item.size || _this2.props.size]),
              _this2.getFormItem(item, index)
            );
          })
        ),
        children
      );
    }
  }]);
  return FormGroup;
}(_react2.default.Component), _class.propTypes = {
  form: _propTypes2.default.object,
  size: _propTypes2.default.oneOf(['sm', 'md', 'lg', 'two-column-wrap', 'three-column-wrap']),
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    dataIndex: _propTypes2.default.string,
    initialValue: _propTypes2.default.any,
    defaultValue: _propTypes2.default.any,
    render: _propTypes2.default.func,
    rules: _propTypes2.default.array,
    hasFeedback: _propTypes2.default.bool,
    size: _propTypes2.default.oneOf([undefined, 'two-column-wrap-item-span-2', 'three-column-wrap-item-span-2', 'three-column-wrap-item-span-3'])
  })),
  dataSource: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  layout: _propTypes2.default.string
}, _class.defaultProps = {
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
    'three-column-wrap': { maxWidth: '1920px' }
  },
  formColumnSpans: {
    'two-column-wrap': { md: 12, sm: 24 },
    'two-column-wrap-item-span-2': { md: 24, sm: 24 },
    'three-column-wrap': { lg: 8, md: 12, sm: 24 },
    'three-column-wrap-item-span-2': { lg: 16, md: 24, sm: 24 },
    'three-column-wrap-item-span-3': { lg: 24, md: 24, sm: 24 }
  },
  formItemSpans: {
    sm: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      }
    },
    md: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    },
    lg: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    },
    'two-column-wrap': {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        md: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 16 }
      }
    },
    'two-column-wrap-item-span-2': {
      labelCol: {
        sm: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 20 }
      }
    },
    'three-column-wrap': {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        md: { span: 8 },
        lg: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 16 },
        lg: { span: 18 }
      }
    },
    'three-column-wrap-item-span-2': {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        md: { span: 4 },
        lg: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 16 },
        lg: { span: 21 }
      }
    },
    'three-column-wrap-item-span-3': {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        md: { span: 4 },
        lg: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 16 },
        lg: { span: 22 }
      }
    }
  }
}, _temp);
exports.default = FormGroup;