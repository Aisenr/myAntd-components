'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var predefinedDataArray = { provinces: _provinces2.default, cities: _cities2.default, areas: _areas2.default };

var ParseCode = function (_React$Component) {
  (0, _inherits3.default)(ParseCode, _React$Component);

  function ParseCode(props) {
    (0, _classCallCheck3.default)(this, ParseCode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ParseCode.__proto__ || (0, _getPrototypeOf2.default)(ParseCode)).call(this, props));

    _this.getObject = function (type, code, array) {
      if (code == null || code === '') {
        return '';
      }
      if (type === 'pca') {
        return _this.getPCA(code);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(array), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          if (value.code === code) {
            return value.name;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return '';
    };

    _this.getProvinceOptions = function () {
      var dataArray = _this.state.dataArray;

      return _this.dataConvert(dataArray);
    };

    _this.getProvinceLabel = function (pCode) {
      var pOption = _this.getProvinceOptions();
      return pOption && pOption.filter(function (item) {
        return item.value === pCode;
      })[0].label;
    };

    _this.getCityOptions = function (pCode) {
      var data = _this.getProvinceOptions();
      var pList = data && data.filter(function (item) {
        return item.value === pCode;
      });
      return pList && pList[0] && pList[0].children || [];
    };

    _this.getCityLabel = function (cCode) {
      var cOption = _this.getCityOptions(cCode.substr(0, 2));
      var obj = cOption && cOption.filter(function (item) {
        return item.value === cCode;
      })[0];
      return obj && obj.label;
    };

    _this.getAreaOptions = function (cCode) {
      var cityOptions = _this.getCityOptions(cCode.substr(0, 2));
      var cList = cityOptions.filter(function (item) {
        return item.value === cCode;
      });
      return cList && cList[0] && cList[0].children || [];
    };

    _this.getAreaLabel = function (aCode) {
      var aOption = _this.getAreaOptions(aCode.substr(0, 4));
      var obj = aOption && aOption.filter(function (item) {
        return item.value === aCode;
      })[0];
      return obj && obj.label;
    };

    _this.getAreaObj = function (aCode) {
      var areaOptions = _this.getAreaOptions(aCode.substr(0, 4));
      return areaOptions.filter(function (item) {
        return item.value === aCode;
      });
    };

    _this.getPCA = function (valueParam) {
      var rData = '';
      if (!valueParam) {
        return '';
      }
      var pName = _this.getProvinceLabel(valueParam.substr(0, 2));
      if (pName == null || pName === '') {
        return rData;
      }
      rData += pName;
      if (valueParam.length === 2) {
        return rData;
      }
      var cName = _this.getCityLabel(valueParam.substr(0, 4));
      if (cName == null || cName === '') {
        return rData;
      }
      rData += '-' + cName;
      if (valueParam.length === 4) {
        return rData;
      }
      var aName = _this.getAreaLabel(valueParam.substr(0, 6));
      if (aName == null || aName === '') {
        return rData;
      }
      rData += '-' + aName;
      return rData;
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

    _this.transformData = function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (_this.props.valueIndex == null || _this.props.textIndex == null) {
        return data;
      }
      var newData = data.map(function (item) {
        var newItem = { value: item[_this.props.valueIndex], text: item[_this.props.textIndex] };
        return newItem;
      });
      return newData;
    };

    _this.chooseValue = function (valueParam, dataArray) {
      if (!dataArray) {
        return valueParam;
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(dataArray), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          if (item[_this.props.valueIndex] === valueParam) {
            return item[_this.props.textIndex];
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    };

    _this.decoration = function (typeParam, valueParam) {
      var dataArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var display = _this.props.display;

      var valueResult = dataArray;
      if (typeParam === 'pca') {
        if (ParseCode.cache.pca) return ParseCode.getPCA(valueParam);
        return _this.getPCA(valueParam);
      } else if (display === 'select') {
        return _react2.default.createElement(_selectItem2.default, (0, _extends3.default)({}, _this.props, { items: _this.transformData(valueResult) }));
      } else if (display === 'radio') {
        return _react2.default.createElement(_radioItem2.default, (0, _extends3.default)({}, _this.props, { items: _this.transformData(valueResult) }));
      } else {
        var reuslt = _this.chooseValue(valueParam, valueResult);
        return reuslt == null ? '' : reuslt;
      }
    };

    _this.state = { dataArray: _this.getDataArrayFromCache(props.type) };
    return _this;
  }

  (0, _createClass3.default)(ParseCode, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setDataArrayToState(nextProps.type);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.isUnmount = true;
    }
  }, {
    key: 'setDataArrayToState',
    value: function setDataArrayToState(type) {
      if (!this.isUnmount) {
        this.setState({ dataArray: this.getDataArrayFromCache(type) });
      }
    }
  }, {
    key: 'getDataArrayFromCache',
    value: function getDataArrayFromCache(type) {
      if (predefinedDataArray[type]) {
        return predefinedDataArray[type];
      }

      var dataArray = ParseCode.cache[type];
      if (!dataArray) {
        this.fetchDataArray(type);
      }
      return dataArray;
    }
  }, {
    key: 'fetchDataArray',
    value: function fetchDataArray(type) {
      var _this2 = this;

      // ParseCode.cache[type] = [];
      ParseCode.fetch && ParseCode.fetch(type).then(function (newData) {
        ParseCode.cache[type] = newData;
        _this2.setDataArrayToState(_this2.props.type);
      });
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
  return ParseCode;
}(_react2.default.Component);

ParseCode.getPCA = function (valueParam) {
  var rData = '';
  if (!valueParam) {
    return '';
  }
  var pName = ParseCode.getObject('', valueParam.substr(0, 2), _provinces2.default);
  if (pName == null || pName === '') {
    return rData;
  }
  rData += pName;
  if (valueParam.length === 2) {
    return rData;
  }
  var cName = ParseCode.getObject('', valueParam.substr(0, 4), _cities2.default);
  if (cName == null || cName === '') {
    return rData;
  }
  rData += '-' + cName;
  if (valueParam.length === 4) {
    return rData;
  }
  var aName = ParseCode.getObject('', valueParam.substr(0, 6), _areas2.default);
  if (aName == null || aName === '') {
    return rData;
  }
  rData += '-' + aName;
  return rData;
};

ParseCode.getObject = function (type, code, array) {
  if (code == null || code === '') {
    return '';
  }
  if (type === 'pca') {
    return ParseCode.getPCA(code);
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(array), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var value = _step3.value;

      if (value.code === code) {
        return value.name;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return '';
};

ParseCode.getObj = function (code) {
  if (code == null) {
    return {};
  }
  var array = void 0;
  if (code.length === 2) {
    array = _provinces2.default;
  } else if (code.length === 4) {
    array = _cities2.default;
  } else if (code.length === 6) {
    array = _areas2.default;
  } else {
    array = [];
  }
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = (0, _getIterator3.default)(array), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var value = _step4.value;

      if (value.code === code) {
        return { label: value.name, value: value.code };
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return {};
};

exports.default = ParseCode;


ParseCode.defaultProps = {
  type: '',
  display: '',
  valueIndex: 'value',
  textIndex: 'label'
};

ParseCode.propTypes = {
  type: _propTypes2.default.string,
  display: _propTypes2.default.string,
  valueIndex: _propTypes2.default.string,
  textIndex: _propTypes2.default.string
};

ParseCode.cache = {};