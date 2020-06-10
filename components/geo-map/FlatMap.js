import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Map, Polyline, Polygon, NavigationControl, Marker } from 'react-bmap';
import PropTypes from 'prop-types';
import * as coordtransform from '../position-input-box/coordtransform';

/**
 * 平面显示地理对象
 * @description 路线图、区域图
 * @export  FlatMap
 * @date    2017-03-05
 * @author  zbs
 */
export default class FlatMap extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    dataType: PropTypes.oneOf(['default', 'geo']),
    pathPoints: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)), PropTypes.object]),
    linePoints: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)), PropTypes.object]),
    positionPoint: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.object]),
  };

  static defaultProps = {
    className: '',
    style: {},
    dataType: 'default',
    pathPoints: null,
    linePoints: null,
    positionPoint: null,
  };

  constructor(props) {
    super(props);
    this.propsToState(props, 'constructor');
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps, 'componentWillReceiveProps');
  }

  propsToState(props, type) {
    const { dataType, pathPoints, linePoints, positionPoint } = props;
    let newCenterPoint = {
      lng: 116.3972282409668,
      lat: 39.90960456049752,
    };
    let newPathPoints = [];
    if (pathPoints) {
      const data = dataType === 'geo' ? pathPoints.coordinates[0] : pathPoints;
      newPathPoints = data.map((item) => {
        const [newPathLng, nowPathLat] = coordtransform.convertWgs84ToBd09(item[0], item[1]);
        return {
          lng: newPathLng,
          lat: nowPathLat,
        };
      });
      newCenterPoint = newPathPoints[0];
    }
    let newLinePoints = [];
    if (linePoints) {
      const data = dataType === 'geo' ? linePoints.coordinates : linePoints;
      newLinePoints = data.map((item) => {
        const [newPathLng, nowPathLat] = coordtransform.convertWgs84ToBd09(item[0], item[1]);
        return {
          lng: newPathLng,
          lat: nowPathLat,
        };
      });
      newCenterPoint = newLinePoints[0];
    }

    let newPositionPoint = [];
    if (positionPoint) {
      const data = dataType === 'geo' ? positionPoint.coordinates : positionPoint;
      newPositionPoint = coordtransform.convertWgs84ToBd09(data[0], data[1]);
      newCenterPoint = {
        lng: newPositionPoint[0],
        lat: newPositionPoint[1],
      };
    }

    if (type === 'constructor') {
      this.state = {
        centerPoint: newCenterPoint,
        pathPoints: newPathPoints,
        linePoints: newLinePoints,
        positionPoint: newPositionPoint,
      };
    } else {
      this.setState({
        centerPoint: newCenterPoint,
        pathPoints: newPathPoints,
        linePoints: newLinePoints,
        positionPoint: newPositionPoint,
      });
    }
  }


  render() {
    const { prefixCls = 'bis-route-map', className, style } = this.props;
    const { centerPoint, linePoints, pathPoints, positionPoint } = this.state;
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <Map
          center={centerPoint}
          style={{ height: style.height || '200px' }}
          zoom="15"
          enableScrollWheelZoom
        >
          <NavigationControl anchor={BMAP_ANCHOR_BOTTOM_RIGHT} type={BMAP_NAVIGATION_CONTROL_ZOOM} />
          {
            positionPoint.length > 0 && <Marker position={{ lng: positionPoint[0], lat: positionPoint[1] }} />
          }
          {
            linePoints.length > 0 && <Polyline path={linePoints} />
          }
          {
            pathPoints.length > 0 && <Polygon path={pathPoints} />
          }
        </Map>
      </div>
    );
  }
}
