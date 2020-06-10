'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldSet = function (_React$Component) {
  (0, _inherits3.default)(FieldSet, _React$Component);

  function FieldSet() {
    (0, _classCallCheck3.default)(this, FieldSet);
    return (0, _possibleConstructorReturn3.default)(this, (FieldSet.__proto__ || (0, _getPrototypeOf2.default)(FieldSet)).apply(this, arguments));
  }

  (0, _createClass3.default)(FieldSet, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-field-set' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: this.props.style },
        _react2.default.createElement(
          _spin2.default,
          { spinning: this.props.loading },
          this.props.title && _react2.default.createElement(
            'div',
            { className: prefixCls + '-header' },
            _react2.default.createElement(
              'div',
              { className: prefixCls + '-title' },
              this.props.title
            ),
            _react2.default.createElement(
              'div',
              { className: prefixCls + '-extra' },
              this.props.extra
            )
          ),
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-children' },
            this.props.children
          )
        )
      );
    }
  }]);
  return FieldSet;
}(_react2.default.Component);

FieldSet.defaultProps = {
  className: null,
  loading: false
};

FieldSet.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};

exports.default = FieldSet;