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

var _steps = require('antd/lib/steps');

var _steps2 = _interopRequireDefault(_steps);

require('antd/lib/steps/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ellipsis = require('../ellipsis');

var _ellipsis2 = _interopRequireDefault(_ellipsis);

var _dateFormat = require('../date-format');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Step = _steps2.default.Step;

/**
 * 进度条组件
 * @description 步骤进度条
 * @export  StepProgress
 * @date    2017-09-21
 * @author  zbs
 */

var StepProgress = function (_React$Component) {
  (0, _inherits3.default)(StepProgress, _React$Component);

  function StepProgress() {
    (0, _classCallCheck3.default)(this, StepProgress);
    return (0, _possibleConstructorReturn3.default)(this, (StepProgress.__proto__ || (0, _getPrototypeOf2.default)(StepProgress)).apply(this, arguments));
  }

  (0, _createClass3.default)(StepProgress, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCla = _props.prefixCla,
          prefixCla = _props$prefixCla === undefined ? 'bis-step-progress' : _props$prefixCla,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: (0, _classnames2.default)(prefixCla, className) },
        _react2.default.createElement(
          _steps2.default,
          { direction: 'vertical', size: 'small', current: this.props.dataSource && this.props.dataSource.length - 1 },
          this.props.dataSource && this.props.dataSource.map(function (item, index) {
            return _react2.default.createElement(Step, {
              key: item.key || index,
              title: item.status,
              description: _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'sapn',
                  { className: prefixCla + '-info' },
                  _react2.default.createElement(_ellipsis2.default, { value: item.information })
                ),
                _react2.default.createElement(
                  'sapn',
                  { className: prefixCla + '-time' },
                  _react2.default.createElement(_dateFormat2.default, { value: item.time, format: 'YYYY-MM-DD hh:mm' })
                )
              )
            });
          })
        )
      );
    }
  }]);
  return StepProgress;
}(_react2.default.Component);

exports.default = StepProgress;


StepProgress.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  dataSource: _propTypes2.default.array
};