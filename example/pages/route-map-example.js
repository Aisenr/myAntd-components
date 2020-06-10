import React from 'react';
import { RouteMap } from '../../components';
import '../../components/route-map/style';

const locationPolygon = [
  {
    lng: 112.440405,
    lat: 34.725754,
  },
  {
    lng: 112.459498,
    lat: 34.72675,
  },
  {
    lng: 112.443132,
    lat: 34.708823,
  },
  {
    lng: 112.463652,
    lat: 34.711775,
  },
];

export default class RouteMapExample extends React.Component {

  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <RouteMap path={locationPolygon} />
      </div>
    );
  }
}
