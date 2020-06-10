'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _provinces = require('china-division/dist/provinces.json');

var _provinces2 = _interopRequireDefault(_provinces);

var _cities = require('china-division/dist/cities.json');

var _cities2 = _interopRequireDefault(_cities);

var _areas = require('china-division/dist/areas.json');

var _areas2 = _interopRequireDefault(_areas);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectItem = require('../select-item');

var _selectItem2 = _interopRequireDefault(_selectItem);

var _radioItem = require('../radio-item');

var _radioItem2 = _interopRequireDefault(_radioItem);

var _parseCode = require('../parse-code');

var _parseCode2 = _interopRequireDefault(_parseCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var predefinedDataArray = { provinces: _provinces2.default, cities: _cities2.default, areas: _areas2.default };

var ParseCodeNew = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(ParseCodeNew, _React$PureComponent);

  function ParseCodeNew(props) {
    (0, _classCallCheck3.default)(this, ParseCodeNew);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ParseCodeNew.__proto__ || (0, _getPrototypeOf2.default)(ParseCodeNew)).call(this, props));

    _this.state = { dataArray: _this.getDataArrayFromCache(props.type) };
    return _this;
  }

  (0, _createClass3.default)(ParseCodeNew, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.isUnmount = true;
    }
  }, {
    key: 'getDataArrayFromCache',
    value: function getDataArrayFromCache(type) {
      if (predefinedDataArray[type]) {
        return predefinedDataArray[type];
      }

      var dataArray = ParseCodeNew.cache[type];
      if (!dataArray) {
        this.fetchDataArray(type);
      }
      return dataArray;
    }
  }, {
    key: 'setDataArrayToState',
    value: function setDataArrayToState(type) {
      if (!this.isUnmount) {
        this.setState({ dataArray: this.getDataArrayFromCache(type) });
      }
    }
  }, {
    key: 'fetchDataArray',
    value: function fetchDataArray(type) {
      var _this2 = this;

      if (typeof ParseCodeNew.fetch === 'function') {
        ParseCodeNew.fetch(type).then(function (newData) {
          _parseCode2.default.cache[type] = newData;
          _this2.setDataArrayToState(_this2.props.type);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          value = _props.value;

      if (predefinedDataArray[type]) {
        return _react2.default.createElement(
          'span',
          null,
          this.getObject(type, value, predefinedDataArray[type])
        );
      }
      return this.decoration(type, value, this.state.dataArray);
    }
  }]);
  return ParseCodeNew;
}(_react2.default.PureComponent), _class.propTypes = {
  type: _propTypes2.default.string,
  display: _propTypes2.default.string,
  valueIndex: _propTypes2.default.string,
  textIndex: _propTypes2.default.string
}, _class.defaultProps = {
  type: '',
  display: '',
  valueIndex: 'value',
  textIndex: 'label'
}, _temp);
exports.default = ParseCodeNew;


ParseCodeNew.cache = {};