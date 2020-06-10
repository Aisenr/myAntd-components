import React from 'react';
import { PositionShow } from '../../components';
import '../../components/position-show/style';

const locationPolygon = {
  type: 'Polygon',
  coordinates: [[
    [
      112.440405,
      34.725754,
    ],
    [
      112.459498,
      34.72675,
    ],
    [
      112.443132,
      34.708823,
    ],
    [
      112.463652,
      34.711775,
    ],
  ]] };

export default class PositionShowExample extends React.Component {

  state = {
    locationPoint: {
      address: '河南省洛阳市老城区G310(连天线)',
      location: {
        type: 'Point',
        coordinates: [],
      },
    },

  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        locationPoint: {
          address: '河南省洛阳市老城区G310(连天线)',
          location: {
            type: 'Point',
            coordinates: [112.4528782958172, 34.71522928514247],
          },
        },
      });
    }, 2000);
  }


  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <PositionShow dataType="geo" value={this.state.locationPoint} path={locationPolygon} />
      </div>
    );
  }
}
