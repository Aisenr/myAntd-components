'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

require('antd/lib/spin/style');

require('antd/lib/card/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ellipsis = require('../ellipsis');

var _ellipsis2 = _interopRequireDefault(_ellipsis);

var _numberFormat = require('../number-format');

var _numberFormat2 = _interopRequireDefault(_numberFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 排行列表组件
 * @description 对列表进行排名显示
 * @export  RankList
 * @createDate    2017-09-21
 * @modifyDate    2018-06-07
 * @author  zbs
 */
var RankList = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(RankList, _React$Component);

  function RankList() {
    (0, _classCallCheck3.default)(this, RankList);
    return (0, _possibleConstructorReturn3.default)(this, (RankList.__proto__ || (0, _getPrototypeOf2.default)(RankList)).apply(this, arguments));
  }

  (0, _createClass3.default)(RankList, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-rank-list' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          loading = _props.loading,
          title = _props.title,
          extra = _props.extra,
          onExtraClick = _props.onExtraClick,
          bodyStyle = _props.bodyStyle,
          dataSource = _props.dataSource,
          onRowClick = _props.onRowClick,
          defaultValue = _props.defaultValue,
          rest = (0, _objectWithoutProperties3.default)(_props, ['prefixCls', 'className', 'style', 'loading', 'title', 'extra', 'onExtraClick', 'bodyStyle', 'dataSource', 'onRowClick', 'defaultValue']);

      return _react2.default.createElement(
        'div',
        { style: style, className: (0, _classnames2.default)(prefixCls, className) },
        _react2.default.createElement(
          _spin2.default,
          { spinning: loading },
          _react2.default.createElement(
            _card2.default,
            (0, _extends3.default)({
              title: title,
              extra: extra && _react2.default.createElement(
                'span',
                { className: prefixCls + '-extra', onClick: onExtraClick },
                extra
              ),
              bodyStyle: (0, _extends3.default)({ padding: '10px' }, bodyStyle)
            }, rest),
            dataSource.length > 0 ? _react2.default.createElement(
              'ul',
              { className: prefixCls + '-ulcla' },
              dataSource.map(function (item, index) {
                return _react2.default.createElement(
                  'li',
                  { key: item.key || (0, _v2.default)(), className: prefixCls + '-li' },
                  _react2.default.createElement(
                    'div',
                    { onClick: function onClick(e) {
                        return onRowClick(item, index, e);
                      } },
                    _react2.default.createElement(
                      'span',
                      { className: prefixCls + '-ranking' },
                      _react2.default.createElement(
                        'span',
                        { className: prefixCls + '-ulcla-index' },
                        index + 1
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: prefixCls + '-content' },
                      _react2.default.createElement(_ellipsis2.default, { value: item.content })
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: prefixCls + '-unit-number' },
                      _react2.default.createElement(
                        'span',
                        { className: prefixCls + '-number' },
                        _react2.default.createElement(_numberFormat2.default, { value: item.number })
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: prefixCls + '-unit' },
                        item.unit
                      )
                    )
                  )
                );
              })
            ) : _react2.default.createElement(
              'div',
              { className: prefixCls + '-defaultValue' },
              defaultValue
            )
          )
        )
      );
    }
  }]);
  return RankList;
}(_react2.default.Component), _class.propTypes = (0, _extends3.default)({}, _card2.default.propTypes, {
  bordered: _propTypes2.default.bool,
  defaultValue: _propTypes2.default.string,
  dataSource: _propTypes2.default.array,
  onRowClick: _propTypes2.default.func,
  onExtraClick: _propTypes2.default.func
}), _class.defaultProps = {
  loading: false,
  bordered: false,
  dataSource: [],
  defaultValue: '暂无数据',
  onRowClick: function onRowClick() {},
  onExtraClick: function onExtraClick() {}
}, _temp);
exports.default = RankList;