import React from 'react';
import { GeoMap } from '../../components';
import '../../components/geo-map/style';

export default class GeoMapExample extends React.Component {

  state = {
    newLinePoints: {
      type: 'LineString',
      coordinates: [[116.34062782447768, 39.95285096018603], [116.48345615612376, 39.94112635635715], [116.37638779247231, 39.88320338312631]],
    },
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        newLinePoints: {
          type: 'LineString',
          coordinates: [[116.34062782447768, 39.95285096018603], [116.48345615612376, 39.94112635635715], [116.37638779247231, 39.88320338312631]],
        },
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <GeoMap
          dataType="geo"
          linePoints={this.state.newLinePoints}
          positionPoint={{
            type: 'Point',
            coordinates: [116.34062782447768, 39.95285096018603],
          }}
        />
        <br />
        <br />
        <GeoMap
          dataType="geo"
          linePoints={this.state.newLinePoints}
          positionPoint={{
            type: 'Point',
            coordinates: [116.34062782447768, 39.95285096018603],
          }}
          display="modal" label="点击"
        />
        <br />
        <br />
        <GeoMap
          dataType="geo"
          pathPoints={{ type: 'Polygon', coordinates: [[[116.40372603938806, 39.919865818358204], [116.39700477837937, 39.90975396091137], [116.41526890481585, 39.91487928787882], [116.40372603938806, 39.919865818358204]]] }}
          display="modal" label="点击"
        />
      </div>
    );
  }
}
