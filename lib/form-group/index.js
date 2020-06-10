'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _dec, _class, _class2, _temp2;

require('antd/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrappedFormGroup = (_dec = _form2.default.create(), _dec(_class = (_temp2 = _class2 = function (_React$Component) {
  (0, _inherits3.default)(WrappedFormGroup, _React$Component);

  function WrappedFormGroup() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, WrappedFormGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WrappedFormGroup.__proto__ || (0, _getPrototypeOf2.default)(WrappedFormGroup)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.props.form.validateFieldsAndScroll(function (err, values) {
        if (!err) {
          _this.props.onSubmit(e, values);
        }
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(WrappedFormGroup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _form2.default,
        { layout: this.props.layout, onSubmit: this.handleSubmit },
        _react2.default.createElement(_FormGroup2.default, this.props)
      );
    }
  }]);
  return WrappedFormGroup;
}(_react2.default.Component), _class2.propTypes = (0, _extends3.default)({}, _FormGroup2.default.propTypes, {
  onSubmit: _propTypes2.default.func
}), _class2.defaultProps = {
  onSubmit: function onSubmit() {}
}, _temp2)) || _class);


function FormWrapper(props) {
  return props.form ? _react2.default.createElement(
    _form2.default,
    { layout: props.layout },
    _react2.default.createElement(_FormGroup2.default, props)
  ) : _react2.default.createElement(WrappedFormGroup, props);
}

FormWrapper.propTypes = _FormGroup2.default.propTypes;
FormWrapper.defaultProps = _FormGroup2.default.defaultProps;

exports.default = FormWrapper;