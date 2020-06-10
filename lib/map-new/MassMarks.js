'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _coordtransform = require('./utils/coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MassMarks = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(MassMarks, _React$PureComponent);

  function MassMarks(props) {
    (0, _classCallCheck3.default)(this, MassMarks);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MassMarks.__proto__ || (0, _getPrototypeOf2.default)(MassMarks)).call(this, props));

    _this.handleClick = function (e) {
      _this.props.onClick(e);
    };

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.element = _this.map.getContainer();
        _this.createMassMarks(props);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(MassMarks, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data && nextProps.data !== this.props.data) {
        this.createMassMarks(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.massMarks) this.map.remove(this.massMarks);
    }
  }, {
    key: 'createMassMarks',
    value: function createMassMarks(props) {
      var data = props.data,
          style = props.style;

      var newData = this.convertCoord(data);
      if (this.massMarks) this.map.remove(this.massMarks);
      var anchor = style.anchor,
          size = style.size;

      var newStyle = (0, _extends3.default)({}, style, {
        anchor: new AMap.Pixel(anchor[0], anchor[1]),
        size: new AMap.Size(size[0], size[1])
      });
      this.massMarks = new AMap.MassMarks(newData, (0, _extends3.default)({}, props, {
        style: newStyle
      }));
      this.massMarks.setMap(this.map);
      this.massMarks.on('click', this.handleClick);
    }
  }, {
    key: 'convertCoord',
    value: function convertCoord(data) {
      return data.map(function (item, index) {
        if (item instanceof Array) {
          var _item = (0, _toArray3.default)(item),
              item01 = _item[0],
              item02 = _item[1],
              rest = _item.slice(2);

          var _lnglat = (0, _coordtransform.convertWgs84ToGcj02)(item01, item02);
          return (0, _extends3.default)({
            lnglat: _lnglat,
            id: index
          }, rest);
        }
        var lnglat = item.lnglat;
        var newlnglat = (0, _coordtransform.convertWgs84ToGcj02)(lnglat[0], lnglat[1]);
        return (0, _extends3.default)({}, item, {
          lnglat: newlnglat,
          id: item.id || index
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return MassMarks;
}(_react2.default.PureComponent), _class.propTypes = {
  zIndex: _propTypes2.default.number,
  opacity: _propTypes2.default.number,
  zooms: _propTypes2.default.arrayOf(_propTypes2.default.number),
  cursor: _propTypes2.default.string,
  alwaysRender: _propTypes2.default.bool,
  style: _propTypes2.default.shape({
    anchor: _propTypes2.default.arrayOf(_propTypes2.default.number),
    url: _propTypes2.default.string,
    size: _propTypes2.default.arrayOf(_propTypes2.default.number),
    rotation: _propTypes2.default.number
  }),
  data: _propTypes2.default.arrayOf(_propTypes2.default.array, _propTypes2.default.object),
  onClick: _propTypes2.default.func
}, _class.defaultProps = {
  zIndex: 111,
  opacity: 0.8,
  zooms: [3, 18],
  cursor: 'pointer',
  alwaysRender: false,
  style: {
    url: '//webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    anchor: [6, 15],
    size: [12, 15]
  },
  data: [],
  onClick: function onClick() {}
}, _temp);
exports.default = MassMarks;