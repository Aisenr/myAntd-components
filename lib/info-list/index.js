'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

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

require('antd/lib/spin/style');

require('antd/lib/card/style');

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
 * 详情组件
 * @description 显示图片、标题、副标题、描述等信息
 * @export  InfoList
 * @date    2017-09-21
 * @author  zbs
 */
var InfoList = function (_React$Component) {
  (0, _inherits3.default)(InfoList, _React$Component);

  function InfoList() {
    (0, _classCallCheck3.default)(this, InfoList);
    return (0, _possibleConstructorReturn3.default)(this, (InfoList.__proto__ || (0, _getPrototypeOf2.default)(InfoList)).apply(this, arguments));
  }

  (0, _createClass3.default)(InfoList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-info-list' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: this.props.style },
        _react2.default.createElement(
          _spin2.default,
          { spinning: this.props.loading },
          _react2.default.createElement(
            _card2.default,
            {
              title: this.props.title,
              extra: _react2.default.createElement(
                'span',
                { className: prefixCls + '-extra', onClick: function onClick(e) {
                    _this2.props.onExtraClick && _this2.props.onExtraClick(e);
                  } },
                this.props.extra || '更多'
              ),
              hoverable: true,
              bodyStyle: (0, _extends3.default)({}, this.props.bodyStyle),
              bordered: false
            },
            this.props.dataSource && this.props.dataSource.length > 0 ? _react2.default.createElement(
              'ul',
              null,
              this.props.dataSource.map(function (item, index) {
                return _react2.default.createElement(
                  'li',
                  { key: item.key || index, className: prefixCls + '-li' },
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick(e) {
                        _this2.props.onRowClick && _this2.props.onRowClick(item, index, e);
                      } },
                    _react2.default.createElement(
                      'span',
                      { className: prefixCls + '-img', style: item.imageUrl ? null : { width: 0 } },
                      item.imageUrl && _react2.default.createElement('img', { src: item.imageUrl, alt: '' })
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: prefixCls + '-right', style: item.imageUrl ? null : { width: '100%' } },
                      _react2.default.createElement(
                        'span',
                        { className: prefixCls + '-title' },
                        _react2.default.createElement(_ellipsis2.default, { value: item.title })
                      ),
                      item.subtitle && _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_ellipsis2.default, { value: item.subtitle })
                      ),
                      item.subtitle ? _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_ellipsis2.default, { value: item.detail })
                      ) : item.imageUrl ? _react2.default.createElement(
                        'span',
                        { className: prefixCls + '-detail' },
                        item.detail
                      ) : _react2.default.createElement(_ellipsis2.default, { value: item.detail })
                    )
                  )
                );
              })
            ) : _react2.default.createElement(
              'div',
              { style: { width: '100%', textAlign: 'center', color: 'rgba(0,0,0,0.43)' } },
              '\u6682\u65E0\u6570\u636E'
            )
          )
        )
      );
    }
  }]);
  return InfoList;
}(_react2.default.Component);

exports.default = InfoList;


InfoList.defaultProps = {
  loading: false
};

InfoList.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  onExtraClick: _propTypes2.default.func,
  extra: _propTypes2.default.string,
  dataSource: _propTypes2.default.array,
  onRowClick: _propTypes2.default.func
};