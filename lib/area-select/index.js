'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _areaSelectModal = require('../area-select-modal');

var _areaSelectModal2 = _interopRequireDefault(_areaSelectModal);

var _areaSelectCascader = require('../area-select-cascader');

var _areaSelectCascader2 = _interopRequireDefault(_areaSelectCascader);

var _areaSelectOneLevel = require('../area-select-one-level');

var _areaSelectOneLevel2 = _interopRequireDefault(_areaSelectOneLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 地区选择下拉框组件
 * @description 地区选择下拉框
 * @export  AreaSelect
 * @date    2017-09-21
 * @author  zbs
 */
var AreaSelect = function (_React$Component) {
  (0, _inherits3.default)(AreaSelect, _React$Component);

  function AreaSelect() {
    (0, _classCallCheck3.default)(this, AreaSelect);
    return (0, _possibleConstructorReturn3.default)(this, (AreaSelect.__proto__ || (0, _getPrototypeOf2.default)(AreaSelect)).apply(this, arguments));
  }

  (0, _createClass3.default)(AreaSelect, [{
    key: 'render',
    value: function render() {
      var display = this.props.display;

      return _react2.default.createElement(
        'div',
        null,
        display === 'modal' && _react2.default.createElement(_areaSelectModal2.default, this.props),
        display === 'cascader' && _react2.default.createElement(_areaSelectCascader2.default, this.props),
        display === 'oneLevel' && _react2.default.createElement(_areaSelectOneLevel2.default, this.props)
      );
    }
  }]);
  return AreaSelect;
}(_react2.default.Component);

exports.default = AreaSelect;


AreaSelect.defaultProps = {
  display: 'cascader'
};

AreaSelect.propTypes = {
  display: _propTypes2.default.oneOf(['modal', 'cascader', 'oneLevel'])
};

AreaSelect.cache = {};