import React from 'react';
import { Map } from '../../components';
import bmapStyle from '../themes/bmap/dark';

export default class MapExample extends React.Component {

  state = {
    showInfoWindow: false,
    mapZoom: 0,
  };

  mapCenter = [121.05, 32.08];

  mapCenter1 =[116.403119, 39.929543];

  mapStyle = { height: '600px' };

  heatmapData = [[112.73069298695866, 34.61250735697583, 10], [114.3527992626271, 36.13893127145908, 1], [114.35394725961513, 36.1400933486123, 1], [112.42720362349372, 34.67031402819789, 1], [112.46312858142858, 34.68904876042166, 1], [112.056861, 32.68465, 1], [112.407396, 34.674822, 1], [123.47130774660502, 41.84335509132782, 1], [123.49316642040111, 41.82358760727239, 1], [123.29787518063169, 41.75258035044884, 1], [112.488609, 34.73954, 10], [123.4917341800821, 41.82657143993664, 1], [112.475128, 34.737013, 1], [112.4949466560549, 34.71138291337035, 1], [113.88536854673778, 34.57638803590497, 1], [123.34846835230725, 41.798897948381125, 1], [123.45183864433959, 41.81164988000118, 1], [113.85646566179754, 34.062066198507985, 1], [113.84428769034497, 34.05769332241654, 1], [112.42219472142524, 34.62068979968355, 1], [112.412745489037, 34.68516742986535, 1], [112.47134468676367, 34.63494873127024, 1], [112.42893506071489, 34.66959629597626, 1], [123.41743139579258, 41.782535999180865, 1], [112.42430623855783, 34.681952797868774, 1], [112.46885518426913, 34.700784928780735, 1], [114.36369542880023, 36.14175442332978, 1], [114.35168013631615, 36.108400366058184, 1], [123.426802, 41.763088, 1], [123.42663, 41.763187, 1], [123.426713, 41.76324, 1], [114.288889, 36.102362, 1], [114.381731, 36.120789, 1], [114.963274, 32.75746, 1], [114.983035, 32.75174, 1], [113.827193, 34.032089, 1], [112.461395, 34.7068, 20]];

  markerData = [
    { name: '金昌', value: [102.188043, 38.520089] },
    { name: '泉州', value: [118.58, 24.93] },
    { name: '莱西', value: [120.53, 36.86] },
    { name: '日照', value: [119.46, 35.42] },
    { name: '胶南', value: [119.97, 35.88] },
    { name: '南通', value: [121.05, 32.08] },
  ];

  circleGraph = {
    cx: 116.403119,
    cy: 39.929543,
    r: 300,
  }

  polylineGraph = {
    points: [
      [116.403119, 39.929543],
      [116.265139, 39.978658],
      [116.217996, 39.904309],
    ],
  }

  polygonGraph = {
    points: [
      [116.442519, 39.945597],
      [116.484488, 39.905315],
      [116.443094, 39.886494],
      [116.426709, 39.900001],
    ],
  }

  graphStyle = {
    color: 'rgba(100,100,100,.3)',
    borderColor: 'red',
    borderWidth: 1,
    borderType: 'dashed',
  }

  polylineStyle = {
    color: 'transparent',
    borderColor: 'red',
    borderWidth: 5,
  }

  mapOption = {
    bmap: {
      mapStyle: {
        style: 'dark',
        styleJson: bmapStyle,
      },
    },
  }

  handleBoundsChanged = (bounds, center, zoom) => {
    console.log('handleBoundsChanged', bounds, center, zoom);
    this.setState({ mapZoom: zoom });
  }

  handleMapClick = (param) => {
    console.log('handleMapClick', param);
  }

  handleMarkerClick = (item) => {
    console.log('handleMarkerClick', item);
    this.setState({ info: item.data });
  }

  handleGraphClick = (item) => {
    console.log('handleGraphClick', item);
  }

  handleInfoWindowButton = () => {
    alert('查看');
  }

  handleInfoWindowClose = () => {
    this.setState({ info: null });
  }

  render() {
    const distance = Map.getDistance([[116.442519, 39.945597], [116.484488, 39.905315], [116.443094, 39.886494]]);
    console.log('distance', distance);
    return (
      <div>
        <Map style={this.mapStyle} option={this.mapOption} center={this.mapCenter} zoom={10} onClick={this.handleMapClick} onBoundsChanged={this.handleBoundsChanged}>
          {this.state.mapZoom < 8 && <Map.Heatmap key="heatmap" data={this.heatmapData} max={5} />}
          {this.state.mapZoom >= 8 && <Map.Markers key="heatmapMarker" data={this.heatmapData} />}
          <Map.Markers data={this.markerData} name="标注" clusterMaxZoom={6} symbolSize={20} onClick={this.handleMarkerClick} />
          {this.state.info &&
          <Map.InfoWindow position={this.state.info.value} onClose={this.handleInfoWindowClose} >
            <div>{this.state.info.name}</div>
            <button onClick={this.handleInfoWindowButton}>查看</button>
          </Map.InfoWindow>
          }
          <Map.Boundary key="河南" name="河南" />
        </Map>
        <Map style={this.mapStyle} center={this.mapCenter1} zoom={12} onClick={this.handleMapClick}>
          <Map.Graph type="circle" name="圆" shape={this.circleGraph} itemStyle={this.graphStyle} onClick={this.handleGraphClick} />
          <Map.Graph type="polygon" name="多边形" shape={this.polygonGraph} itemStyle={this.graphStyle} onClick={this.handleGraphClick} />
          <Map.Graph type="polyline" name="折线" shape={this.polylineGraph} itemStyle={this.polylineStyle} onClick={this.handleGraphClick} />
        </Map>

        <Map style={this.mapStyle} center={this.mapCenter1} zoom={12} onClick={this.handleMapClick} />
      </div>
    );
  }
}
