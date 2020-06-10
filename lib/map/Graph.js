'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _coordtransform = require('./coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graph = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Graph, _React$PureComponent);

  function Graph(props) {
    (0, _classCallCheck3.default)(this, Graph);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Graph.__proto__ || (0, _getPrototypeOf2.default)(Graph)).call(this, props));

    _this.handleClick = function (params) {
      if (params.seriesId === _this.getSeriesId()) {
        params.event.event.data = {
          type: params.seriesName,
          data: params.data.$original || params.data
        };
        _this.props.onClick(params.event.event.data);
      }
    };

    _this.customRenderItem = function (params, api) {
      var data = api.value(2);
      if (!data) {
        return;
      }

      if (data.type === 'circle') {
        var point = [data.shape.cx, data.shape.cy];

        var _api$coord = api.coord(point),
            _api$coord2 = (0, _slicedToArray3.default)(_api$coord, 2),
            cx = _api$coord2[0],
            cy = _api$coord2[1];

        return {
          type: data.type,
          shape: {
            cx: cx,
            cy: cy,
            r: _this.getScreenLength(new BMap.Point(point[0], point[1]), data.shape.r)
          },
          style: api.style()
        };
      } else {
        var result = {
          type: data.type,
          shape: {
            points: data.shape.points.map(function (p) {
              return api.coord(p);
            })
          },
          style: api.style()
        };
        return result;
      }
    };

    _this.series = {
      id: 'graph' + Math.floor(Math.random() * 10000000000),
      name: 'graph',
      type: 'custom',
      coordinateSystem: 'bmap',
      animationDurationUpdate: 0
    };

    _this.state = {
      shape: _this.convertCoord(props.type, props.shape)
    };
    return _this;
  }

  (0, _createClass3.default)(Graph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setOptions();
        _this2.props.map.chart.on('click', _this2.handleClick);
      }, 0);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.shape && nextProps.shape !== this.props.shape) {
        this.setState({
          shape: this.convertCoord(nextProps.type, nextProps.shape)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setOptions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.map) {
        this.props.map.chart && this.props.map.chart.off('click', this.handleClick);
        this.props.map.setOptions({
          series: [(0, _extends3.default)({}, this.series, { id: this.getSeriesId(), data: [] })]
        });
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      this.props.map.setOptions({
        series: [(0, _extends3.default)({}, this.series, {
          id: this.getSeriesId(),
          name: this.props.name || this.series.name,
          dimensions: ['lng', 'lat', { name: 'value', type: 'ordinal' }],
          renderItem: this.customRenderItem,
          data: [{
            name: this.props.name,
            value: [0, 0, { type: this.props.type, shape: this.state.shape }],
            itemStyle: { normal: this.props.itemStyle }
          }]
        })]
      });
    }
  }, {
    key: 'getSeriesId',
    value: function getSeriesId() {
      return this.props.id || this.series.id;
    }
  }, {
    key: 'getScreenLength',
    value: function getScreenLength(point, length) {
      var map = this.props.map.map;
      var start = point;
      var end = new BMap.Point(point.lng + 0.1, point.lat);
      var distance = map.getDistance(start, end);
      var startPixel = map.pointToPixel(start);
      var endPixel = map.pointToPixel(end);
      return length / distance * Math.abs(endPixel.x - startPixel.x);
    }
  }, {
    key: 'convertCoord',
    value: function convertCoord(type, shape) {
      if (type === 'circle') {
        var _convertWgs84ToBd = (0, _coordtransform.convertWgs84ToBd09)(shape.cx, shape.cy),
            _convertWgs84ToBd2 = (0, _slicedToArray3.default)(_convertWgs84ToBd, 2),
            cx = _convertWgs84ToBd2[0],
            cy = _convertWgs84ToBd2[1];

        return { cx: cx, cy: cy, r: shape.r };
      } else {
        return {
          points: shape.points.map(function (p) {
            return (0, _coordtransform.convertWgs84ToBd09)(p[0], p[1]);
          })
        };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Graph;
}(_react2.default.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string,
  type: _propTypes2.default.oneOf(['circle', 'rectangle', 'polyline', 'polygon']).isRequired,
  shape: _propTypes2.default.shape({
    cx: _propTypes2.default.number,
    cy: _propTypes2.default.number,
    r: _propTypes2.default.number,
    points: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number))
  }).isRequired,
  itemStyle: _propTypes2.default.shape({
    color: _propTypes2.default.string,
    borderColor: _propTypes2.default.string,
    borderWidth: _propTypes2.default.number,
    borderType: _propTypes2.default.oneOf(['solid', 'dashed', 'dotted']),
    opacity: _propTypes2.default.number
  }),
  onClick: _propTypes2.default.func
}, _class.defaultProps = {
  itemStyle: {},
  onClick: function onClick() {}
}, _temp);
exports.default = Graph;