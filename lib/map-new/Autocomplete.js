'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _autoComplete = require('antd/lib/auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

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

require('antd/lib/auto-complete/style');

require('antd/lib/button/style');

require('antd/lib/icon/style');

require('antd/lib/select/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _inputItem = require('../input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _coordtransform = require('./utils/coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixCls = 'bis-autocomplete-search';
var AutocompleteSearch = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(AutocompleteSearch, _React$PureComponent);

  function AutocompleteSearch(props) {
    (0, _classCallCheck3.default)(this, AutocompleteSearch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AutocompleteSearch.__proto__ || (0, _getPrototypeOf2.default)(AutocompleteSearch)).call(this, props));

    _this.handleSearch = function (value) {
      _this.map.getCity(function (_ref) {
        var citycode = _ref.citycode;

        _this.autocomplete.setCity(citycode);
        _this.autocomplete.search(value, function (status, result) {
          if (status === 'complete') {
            var tips = result.tips;

            _this.setState({
              dataSource: tips
            });
          }
        });
      });
    };

    _this.handleSelect = function (value) {
      var dataSource = _this.state.dataSource;

      dataSource.forEach(function (item) {
        if (item.id === value || item.id === '') {
          _this.select(item.name, item);
        }
      });
    };

    _this.handleChange = function (value, opt) {
      var children = opt.props.children;

      _this.setState({
        autoCompleteObj: opt,
        autoCompleteValue: children instanceof Array ? children[0] : children
      });
    };

    _this.handleButtonSearch = function (value, autoCompleteObj) {
      var id = autoCompleteObj.key,
          children = autoCompleteObj.props.children;

      _this.select(value, { id: id, name: children instanceof Array ? children[0] : children });
    };

    _this.handleMarkerClick = function (marker, text, item) {
      var onClick = _this.props.onClick;

      if (_this.lastMarker) {
        _this.lastMarker.setContent('<div class=' + prefixCls + '-blue>' + _this.lastMarkerText + '</div>');
        _this.lastMarker.setzIndex(111 - text);
      }
      marker.setContent('<div class=' + prefixCls + '-red>' + text + '</div>');
      marker.setzIndex(111);
      _this.lastMarker = marker;
      _this.lastMarkerText = text;
      onClick(item);
    };

    _this.renderOption = function (item) {
      return _react2.default.createElement(
        _select2.default.Option,
        { key: item.id || (0, _v2.default)(), value: item.name },
        item.name,
        _react2.default.createElement(
          'span',
          { style: { color: '#d5d5d5', marginLeft: '10px' }, title: item.district },
          item.district
        )
      );
    };

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.element = _this.map.getContainer();
        _this.createAutocomplete(props);
      }
    }
    _this.state = {
      dataSource: [],
      iconCla: 'blue'
    };
    return _this;
  }

  (0, _createClass3.default)(AutocompleteSearch, [{
    key: 'createAutocomplete',
    value: function createAutocomplete() {
      var _this2 = this;

      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        _this2.autocomplete = new AMap.Autocomplete();
        _this2.placeSearch = new AMap.PlaceSearch();
      });
    }
  }, {
    key: 'select',
    value: function select(name, obj) {
      var _this3 = this;

      var onChange = this.props.onChange;

      this.map.getCity(function (_ref2) {
        var citycode = _ref2.citycode;

        _this3.placeSearch.setCity(citycode);
        _this3.placeSearch.search(name, function (status, result) {
          var pois = result.poiList.pois;

          onChange(_this3.convertCoord(obj), pois.map(function (item) {
            return _this3.convertCoord(item);
          }));
        });
      });
    }
  }, {
    key: 'convertCoord',
    value: function convertCoord(data) {
      var _ref3 = data.location || {},
          lng = _ref3.lng,
          lat = _ref3.lat;

      var newLngLat = (0, _coordtransform.convertGcj02ToWgs84)(lng, lat);
      return (0, _extends3.default)({}, data, {
        location: (0, _extends3.default)({}, data.location, {
          lng: newLngLat[0],
          lat: newLngLat[1]
        })
      });
    }

    /**
     * 输入框变化出发
     */


    /**
     * 选中选项
     * @param value
     */


    // renderMarker = (points) => {
    //   this.map.clearMap();
    //   const { iconCla } = this.state;
    //   const markers = [];
    //   points.forEach((item, index) => {
    //     const marker = new AMap.Marker({
    //       map: this.map,
    //       content: `<div class=${prefixCls}-${iconCla}>${index + 1}</div>`,
    //       position: [item.location.lng, item.location.lat],
    //       offset: new AMap.Pixel(-10, -16),
    //       zIndex: 110 - index,
    //     });
    //     markers.push(marker);
    //     marker.on('click', () => this.handleMarkerClick(marker, index + 1, item));
    //   });
    //   return markers;
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          dataSource = _state.dataSource,
          autoCompleteValue = _state.autoCompleteValue,
          autoCompleteObj = _state.autoCompleteObj;

      return _react2.default.createElement(
        'div',
        { style: { padding: '10px 15px', position: 'absolute', top: '45px', zIndex: 999 } },
        _react2.default.createElement(
          _autoComplete2.default,
          {
            dataSource: dataSource.map(this.renderOption),
            style: { width: '315px' },
            placeholder: '\u8BF7\u8F93\u5165\u5730\u5740'
            // readOnly={readOnly}
            , onSelect: this.handleSelect,
            onSearch: this.handleSearch,
            onChange: this.handleChange,
            value: autoCompleteValue
          },
          _react2.default.createElement(_inputItem2.default, {
            suffix: _react2.default.createElement(
              _button2.default,
              { style: { right: '-12px', backgroundColor: '#eee' }, onClick: function onClick() {
                  return _this4.handleButtonSearch(autoCompleteValue, autoCompleteObj);
                } },
              _react2.default.createElement(_icon2.default, { type: 'search' })
            )
          })
        )
      );
    }
  }]);
  return AutocompleteSearch;
}(_react2.default.PureComponent), _class.propTypes = {
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  onClick: function onClick() {},
  onChange: function onChange() {}
}, _temp);
exports.default = AutocompleteSearch;