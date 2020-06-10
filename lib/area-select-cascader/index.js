'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _cascader = require('antd/lib/cascader');

var _cascader2 = _interopRequireDefault(_cascader);

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

require('antd/lib/cascader/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cascaderAddressOptions = require('../area-select/cascader-address-options');

var _cascaderAddressOptions2 = _interopRequireDefault(_cascaderAddressOptions);

var _regionParse = require('./regionParse');

var _regionParse2 = _interopRequireDefault(_regionParse);

var _parseCode = require('../parse-code');

var _parseCode2 = _interopRequireDefault(_parseCode);

var _areaSelect = require('../area-select');

var _areaSelect2 = _interopRequireDefault(_areaSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 地区选择下拉框组件
 * @description 地区选择下拉框
 * @export  AreaSelect
 * @date    2017-09-21
 * @author  zbs
 */
var AreaSelectCascader = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(AreaSelectCascader, _React$Component);

  function AreaSelectCascader(props) {
    (0, _classCallCheck3.default)(this, AreaSelectCascader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AreaSelectCascader.__proto__ || (0, _getPrototypeOf2.default)(AreaSelectCascader)).call(this, props));

    _this.getPcaList = function () {
      var pcaList = _areaSelect2.default.cache.pca;
      if (!pcaList) {
        _areaSelect2.default.fetch && _areaSelect2.default.fetch().then(function (data) {
          _areaSelect2.default.cache.pca = data;
          _this.pcaListToState(data);
        });
      } else {
        _this.pcaListToState(pcaList);
      }
      return pcaList;
    };

    _this.getProvinceOptions = function () {
      var pcaList = _this.state.pcaList;

      return _this.dataConvert(pcaList);
    };

    _this.getCityOptions = function (pCode) {
      var data = _this.getProvinceOptions();
      var pList = data && data.filter(function (item) {
        return item.value === pCode;
      });
      return pList && pList[0] && pList[0].children || [];
    };

    _this.getAreaOptions = function (cCode) {
      var currentCityOptions = _this.getCityOptions(cCode.substr(0, 2));
      var cList = currentCityOptions.filter(function (item) {
        return item.value === cCode;
      });
      return cList && cList[0] && cList[0].children || [];
    };

    _this.getAreaObj = function (aCode) {
      var currentAreaOptions = _this.getAreaOptions(aCode.substr(0, 4));
      return currentAreaOptions.filter(function (item) {
        return item.value === aCode;
      });
    };

    _this.dataConvert = function (params) {
      return params && params.map(function (item) {
        return {
          label: item.name,
          value: item.code,
          children: _this.dataConvert(item.children)
        };
      });
    };

    _this.pcaListToState = function (param) {
      if (!_this.isUnmount) {
        _this.setState({
          pcaList: param
        });
      }
    };

    _this.handleChange = function (data) {
      if (data.length >= 1) {
        _this.props.onChange(data[data.length - 1]);
      } else {
        _this.props.onChange('');
      }
    };

    _this.state = { pcaList: _this.getPcaList() };
    return _this;
  }

  (0, _createClass3.default)(AreaSelectCascader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.getPcaList();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.isUnmount = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          regionRestrict = _props.regionRestrict,
          expandTrigger = _props.expandTrigger,
          changeOnSelect = _props.changeOnSelect,
          rest = (0, _objectWithoutProperties3.default)(_props, ['regionRestrict', 'expandTrigger', 'changeOnSelect']);
      var _props2 = this.props,
          className = _props2.className,
          style = _props2.style,
          placeholder = _props2.placeholder,
          propOptions = _props2.options,
          areaId = _props2.value,
          restrict = _props2.restrict;

      var newPropOptions = regionRestrict ? (0, _regionParse2.default)(regionRestrict) : propOptions;
      var areaArr = [];
      if (areaId && !(areaId instanceof Array)) {
        if (areaId.length >= 2 && !(restrict && restrict.length >= 2)) {
          areaArr.push(areaId.substr(0, 2));
        }
        if (areaId.length >= 4 && !(restrict && restrict.length >= 4)) {
          areaArr.push(areaId.substr(0, 4));
        }
        if (areaId.length >= 6 && !(restrict && restrict.length > 6)) {
          areaArr.push(areaId.substr(0, 6));
        }
      }
      var newOptions = {};
      if (restrict) {
        if (restrict.length === 2) {
          newOptions = _areaSelect2.default.fetch ? this.getCityOptions(restrict) : (0, _cascaderAddressOptions.cityOptions)(restrict);
        } else if (restrict.length === 4) {
          newOptions = _areaSelect2.default.fetch ? this.getAreaOptions(restrict) : (0, _cascaderAddressOptions.areaOptions)(restrict);
        } else if (restrict.length === 6) {
          newOptions = _areaSelect2.default.fetch ? this.getAreaObj(restrict) : (0, _cascaderAddressOptions.areaObj)(restrict);
        }
      } else {
        newOptions = _areaSelect2.default.fetch ? this.getProvinceOptions(restrict) : _cascaderAddressOptions2.default;
      }

      return _react2.default.createElement(
        'div',
        { style: style, className: className },
        _react2.default.createElement(_cascader2.default, (0, _extends3.default)({}, rest, {
          value: areaArr.length > 0 ? areaArr : null,
          placeholder: placeholder,
          options: newPropOptions || newOptions,
          onChange: this.handleChange,
          style: { width: '100%' },
          expandTrigger: expandTrigger,
          changeOnSelect: changeOnSelect
        }))
      );
    }
  }]);
  return AreaSelectCascader;
}(_react2.default.Component), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  placeholder: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  options: _propTypes2.default.array,
  restrict: _propTypes2.default.string,
  regionRestrict: _propTypes2.default.arrayOf(_propTypes2.default.string),
  value: _propTypes2.default.string,
  expandTrigger: _propTypes2.default.oneOf(['hover', 'click']),
  changeOnSelect: _propTypes2.default.bool
}, _class.defaultProps = {
  className: '',
  style: {},
  placeholder: '请选择地区',
  onChange: function onChange() {},

  options: null,
  restrict: '',
  regionRestrict: null,
  value: '',
  expandTrigger: 'hover',
  changeOnSelect: true
}, _temp);
exports.default = AreaSelectCascader;