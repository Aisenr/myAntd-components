'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _Markers = require('./Markers');

var _Markers2 = _interopRequireDefault(_Markers);

var _Heatmap = require('./Heatmap');

var _Heatmap2 = _interopRequireDefault(_Heatmap);

var _Graph = require('./Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _Graphs = require('./Graphs');

var _Graphs2 = _interopRequireDefault(_Graphs);

var _InfoWindow = require('./InfoWindow');

var _InfoWindow2 = _interopRequireDefault(_InfoWindow);

var _Boundary = require('./Boundary');

var _Boundary2 = _interopRequireDefault(_Boundary);

var _coordtransform = require('./coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Map2.default.Markers = _Markers2.default;
_Map2.default.Heatmap = _Heatmap2.default;
_Map2.default.Graph = _Graph2.default;
_Map2.default.Graphs = _Graphs2.default;
_Map2.default.InfoWindow = _InfoWindow2.default;
_Map2.default.Boundary = _Boundary2.default;
_Map2.default.getDistance = _coordtransform.getDistance;

exports.default = _Map2.default;