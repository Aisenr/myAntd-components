'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _Markers = require('./Markers');

var _Markers2 = _interopRequireDefault(_Markers);

var _InfoWindow = require('./InfoWindow');

var _InfoWindow2 = _interopRequireDefault(_InfoWindow);

var _Graphs = require('./Graphs');

var _Graphs2 = _interopRequireDefault(_Graphs);

var _Heatmap = require('./Heatmap');

var _Heatmap2 = _interopRequireDefault(_Heatmap);

var _Boundary = require('./Boundary');

var _Boundary2 = _interopRequireDefault(_Boundary);

var _ControlBar = require('./controls/ControlBar');

var _ControlBar2 = _interopRequireDefault(_ControlBar);

var _MapType = require('./controls/MapType');

var _MapType2 = _interopRequireDefault(_MapType);

var _OverView = require('./controls/OverView');

var _OverView2 = _interopRequireDefault(_OverView);

var _Scale = require('./controls/Scale');

var _Scale2 = _interopRequireDefault(_Scale);

var _ToolBar = require('./controls/ToolBar');

var _ToolBar2 = _interopRequireDefault(_ToolBar);

var _Geolocation = require('./controls/Geolocation');

var _Geolocation2 = _interopRequireDefault(_Geolocation);

var _Autocomplete = require('./Autocomplete');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

var _MassMarks = require('./MassMarks');

var _MassMarks2 = _interopRequireDefault(_MassMarks);

var _ContextMenu = require('./ContextMenu');

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _geocoder = require('./utils/geocoder');

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Map2.default.Markers = _Markers2.default;
_Map2.default.InfoWindow = _InfoWindow2.default;
_Map2.default.Graphs = _Graphs2.default;
_Map2.default.Heatmap = _Heatmap2.default;
_Map2.default.Boundary = _Boundary2.default;
_Map2.default.ControlBar = _ControlBar2.default;
_Map2.default.MapType = _MapType2.default;
_Map2.default.OverView = _OverView2.default;
_Map2.default.Scale = _Scale2.default;
_Map2.default.ToolBar = _ToolBar2.default;
_Map2.default.Geolocation = _Geolocation2.default;
_Map2.default.Autocomplete = _Autocomplete2.default;
_Map2.default.MassMarks = _MassMarks2.default;
_Map2.default.ContextMenu = _ContextMenu2.default;
_Map2.default.Track = _Track2.default;
_Map2.default.getAddress = _geocoder.getAddress;
_Map2.default.getLocation = _geocoder.getLocation;
_Map2.default.getRegionalCoordinates = _geocoder.getRegionalCoordinates;
_Map2.default.getDistance = _geocoder.getDistance;

exports.default = _Map2.default;