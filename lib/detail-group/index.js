'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _temp2;

require('antd/lib/row/style');

require('antd/lib/col/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 详情组件
 * @description key-value形式的详情信息（一列）
 * @export  DetailsKeyValue
 * @date    2017-09-28
 * @author  zbs
 */
var DetailGroup = (_temp2 = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(DetailGroup, _React$PureComponent);

  function DetailGroup() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DetailGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DetailGroup.__proto__ || (0, _getPrototypeOf2.default)(DetailGroup)).call.apply(_ref, [this].concat(args))), _this), _this.getItemValueNode = function (item, index) {
      var value = (0, _lodash2.default)(_this.props.dataSource, item.dataIndex, item.defaultValue);
      if (item.render) {
        var result = item.render(value, _this.props.dataSource, index);
        return result == null ? '' : result;
      }
      return value && value.toString();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DetailGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-detail-group' : _props$prefixCls,
          className = _props.className;

      var style = (0, _extends3.default)({}, this.props.mapMaxWidth[this.props.size], this.props.style);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        _react2.default.createElement(
          _row2.default,
          { gutter: 16 },
          this.props.items.map(function (item, index) {
            var itemValueNode = _this2.getItemValueNode(item, index);
            var columnItemSpans = _this2.props.mapColumnSpans[item.size || _this2.props.size];
            return _react2.default.createElement(
              _col2.default,
              (0, _extends3.default)({ key: item.key || index }, _this2.props.columnSpans[item.size || _this2.props.size]),
              _react2.default.createElement(
                _row2.default,
                { className: prefixCls + '-row' },
                _react2.default.createElement(
                  _col2.default,
                  (0, _extends3.default)({}, columnItemSpans.labelCol, { className: prefixCls + '-label' }),
                  item.label
                ),
                _react2.default.createElement(
                  _col2.default,
                  (0, _extends3.default)({}, columnItemSpans.wrapperCol, { className: prefixCls + '-text' }),
                  itemValueNode,
                  itemValueNode && item.unit && _react2.default.createElement(
                    'span',
                    { style: { paddingLeft: '3px' } },
                    item.unit
                  )
                )
              )
            );
          })
        )
      );
    }
  }]);
  return DetailGroup;
}(_react2.default.PureComponent), _class.defaultProps = {
  size: 'two-column-wrap',
  items: [],
  dataSource: {},
  columnSpans: {
    'two-column-wrap': { md: 12, sm: 24 },
    'two-column-wrap-item-span-2': { md: 24, sm: 24 },
    'three-column-wrap': { lg: 8, md: 12, sm: 24 },
    'three-column-wrap-item-span-2': { lg: 16, md: 24, sm: 24 },
    'three-column-wrap-item-span-3': { lg: 24, md: 24, sm: 24 }
  },
  mapMaxWidth: {
    sm: { maxWidth: '360px' },
    md: { maxWidth: '540px' },
    lg: { maxWidth: '1080px' },
    'two-column-wrap': { maxWidth: '1080px' },
    'three-column-wrap': { maxWidth: '1920px' }
  },
  mapColumnSpans: {
    sm: {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    },
    md: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    },
    lg: {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 }
      }
    },
    'two-column-wrap': {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 },
        md: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 16 },
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
}, _class.propTypes = {
  size: _propTypes2.default.oneOf(['sm', 'md', 'lg', 'two-column-wrap', 'three-column-wrap']),
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.object,
    label: _propTypes2.default.string,
    dataIndex: _propTypes2.default.string,
    render: _propTypes2.default.func,
    size: _propTypes2.default.oneOf([undefined, 'two-column-wrap-item-span-2', 'three-column-wrap-item-span-2', 'three-column-wrap-item-span-3'])
  })),
  dataSource: _propTypes2.default.object,
  columnSpans: _propTypes2.default.object
}, _temp2);
exports.default = DetailGroup;