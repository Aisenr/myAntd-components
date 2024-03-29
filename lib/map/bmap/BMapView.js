'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var echarts = require("echarts");

var _default = echarts.extendComponentView({
  type: 'bmap',
  render: function render(bMapModel, ecModel, api) {
    var rendering = true;
    var bmap = bMapModel.getBMap();
    var viewportRoot = api.getZr().painter.getViewportRoot();
    var coordSys = bMapModel.coordinateSystem;

    var moveHandler = function moveHandler(type, target) {
      if (rendering) {
        return;
      }

      var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
      var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0];
      viewportRoot.style.left = mapOffset[0] + 'px';
      viewportRoot.style.top = mapOffset[1] + 'px';
      coordSys.setMapOffset(mapOffset);
      bMapModel.__mapOffset = mapOffset;
      api.dispatchAction({
        type: 'bmapRoam'
      });
    };

    function zoomEndHandler() {
      if (rendering) {
        return;
      }

      api.dispatchAction({
        type: 'bmapRoam'
      });
    }

    bmap.removeEventListener('moving', this._oldMoveHandler); // FIXME
    // Moveend may be triggered by centerAndZoom method when creating coordSys next time
    // bmap.removeEventListener('moveend', this._oldMoveHandler);

    bmap.removeEventListener('zoomend', this._oldZoomEndHandler);
    bmap.addEventListener('moving', moveHandler); // bmap.addEventListener('moveend', moveHandler);

    bmap.addEventListener('zoomend', zoomEndHandler);
    this._oldMoveHandler = moveHandler;
    this._oldZoomEndHandler = zoomEndHandler;
    var roam = bMapModel.get('roam');

    if (roam && roam !== 'scale') {
      bmap.enableDragging();
    } else {
      bmap.disableDragging();
    }

    if (roam && roam !== 'move') {
      bmap.enableScrollWheelZoom();
      bmap.enableDoubleClickZoom();
      bmap.enablePinchToZoom();
    } else {
      bmap.disableScrollWheelZoom();
      bmap.disableDoubleClickZoom();
      bmap.disablePinchToZoom();
    }

    var originalStyle = bMapModel.__mapStyle;
    var newMapStyle = bMapModel.get('mapStyle') || {}; // FIXME, Not use JSON methods

    var mapStyleStr = (0, _stringify2.default)(newMapStyle);

    if ((0, _stringify2.default)(originalStyle) !== mapStyleStr) {
      // FIXME May have blank tile when dragging if setMapStyle
      if ((0, _keys2.default)(newMapStyle).length) {
        bmap.setMapStyle(newMapStyle);
      }

      bMapModel.__mapStyle = JSON.parse(mapStyleStr);
    }

    rendering = false;
  }
});

module.exports = _default;