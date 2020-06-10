'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

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

require('antd/lib/modal/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FlatMap = require('./FlatMap');

var _FlatMap2 = _interopRequireDefault(_FlatMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalMap = (_temp2 = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(ModalMap, _React$PureComponent);

  function ModalMap() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalMap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalMap.__proto__ || (0, _getPrototypeOf2.default)(ModalMap)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false
    }, _this.handleHideModal = function () {
      _this.setState({
        visible: false
      });
    }, _this.handleShowMap = function () {
      _this.setState({
        visible: true
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ModalMap, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { onClick: this.handleShowMap },
          this.props.label
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u5730\u7406\u4F4D\u7F6E',
            visible: this.state.visible,
            onCancel: this.handleHideModal,
            bodyStyle: { padding: 0 },
            width: 800,
            footer: null
          },
          this.state.visible && _react2.default.createElement(_FlatMap2.default, (0, _extends3.default)({}, this.props, { style: { height: '500px' } }))
        )
      );
    }
  }]);
  return ModalMap;
}(_react2.default.PureComponent), _class.propTypes = {
  label: _propTypes2.default.string
}, _class.defaultProps = {
  label: '点击查看'
}, _temp2);
exports.default = ModalMap;