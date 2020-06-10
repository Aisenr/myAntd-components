'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

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

require('antd/lib/table/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ellipsis = require('../ellipsis');

var _ellipsis2 = _interopRequireDefault(_ellipsis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 表格
 * @description 将内容一表格形式展示
 * @export  ListTable
 * @date    2017-09-28
 * @author  zbs
 */

var themeMap = {
  'square-border': { size: 'large', style: { float: 'none', textAlign: 'center' } },
  'no-border': { style: { float: 'none', textAlign: 'center' } }
};

var prefixCls = 'bis-list-table';
var ListTable = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(ListTable, _React$Component);

  function ListTable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ListTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ListTable.__proto__ || (0, _getPrototypeOf2.default)(ListTable)).call.apply(_ref, [this].concat(args))), _this), _this.rowClassName = function (record, index) {
      var zebraCrossing = _this.props.zebraCrossing;

      if (zebraCrossing === 'even') {
        return index % 2 === 1 ? prefixCls + '-odd' : prefixCls + '-even';
      } else if (zebraCrossing === 'odd') {
        return index % 2 === 0 ? prefixCls + '-odd' : prefixCls + '-even';
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ListTable, [{
    key: 'render',
    value: function render() {
      var newProps = this.props.pagination ? (0, _extends3.default)({}, this.props, {
        pagination: (0, _extends3.default)({}, themeMap[this.props.theme], this.props.pagination)
      }) : (0, _extends3.default)({}, this.props, { pagination: false });
      var columns = this.props.columns && this.props.columns.map(function (column) {
        if (column.render) {
          return (0, _extends3.default)({}, column, {
            render: function render(text, record, index) {
              return typeof column.render(text, record, index) === 'string' ? _react2.default.createElement(_ellipsis2.default, { value: column.render(text, record, index) }) : _react2.default.createElement(
                'span',
                { className: prefixCls + '-render' },
                column.render(text, record, index)
              );
            }
          });
        } else {
          return (0, _extends3.default)({}, column, {
            render: function render(text) {
              return _react2.default.createElement(_ellipsis2.default, { value: text });
            }
          });
        }
      });

      return _react2.default.createElement(_table2.default, (0, _extends3.default)({
        size: 'middle',
        rowKey: function rowKey(record) {
          return newProps.rowKeyIndex && record[newProps.rowKeyIndex];
        },
        rowClassName: this.rowClassName
      }, newProps, {
        columns: columns,
        className: (0, _classnames2.default)(prefixCls, this.props.className)
      }));
    }
  }]);
  return ListTable;
}(_react2.default.Component), _class.defaultProps = {
  className: '',
  style: {},
  columns: [],
  dataSource: [],
  showHeader: true,
  theme: 'square-border',
  zebraCrossing: 'none',
  bordered: false
}, _temp2);
exports.default = ListTable;


ListTable.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  columns: _propTypes2.default.array,
  dataSource: _propTypes2.default.array,
  showHeader: _propTypes2.default.bool,
  bordered: _propTypes2.default.bool,
  theme: _propTypes2.default.oneOf(['square-border', 'no-border']),
  zebraCrossing: _propTypes2.default.oneOf(['odd', 'even', 'none'])
};