import React from 'react';
import { MapNew } from '../../components';
import PropTypes from 'prop-types';
import { heatmapData, massData, massDataNew } from './map-new-data';
import Map from '../../components/map-new/Map';
import '../../components/map-new/style';
import ContextMenu from '../../components/map-new/ContextMenu';

const data = [{
  name: '轨迹0',
  path: [
    [100.340417, 27.376994],
    [108.426354, 37.827452],
    [113.392174, 31.208439],
    [124.905846, 42.232876],
  ],
}, {
  name: '大地线',
  // 创建一条包括500个插值点的大地线
  path: [[116.405289, 39.904987], [87.61792, 43.793308], 500],
  type: 'earthLine',
}];

export default class MapExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // zoom: 15,
      contentInfoWindow: '你好',
      mapMakersStyle: [{
        url: '../images/m1.png',
        size: [53, 52],
        offset: [-16, -16],
      }, {
        url: '../images/m2.png',
        size: [56, 55],
      }, {
        url: '../images/m3.png',
        size: [66, 65],
      }, {
        url: '../images/m4.png',
        size: [78, 77],
      }, {
        url: '../images/m5.png',
        size: [90, 89],
      }],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        contentInfoWindow: '<div>Hello World<br />I`m xiaote<div>',
      });
    }, 2000);
  }

  handleClick = ({ point }) => {
    console.log('point', point);
  }

  heatmapData = [
    {
      value: [112.73069298695866, 34.61250735697583],
      symbol: 'image///coms',
    },
    [114.3527992626271, 36.13893127145908], [114.35394725961513, 36.1400933486123], [112.42720362349372, 34.67031402819789], [112.46312858142858, 34.68904876042166], { value: [112.056861, 32.68465], name: '新野县' }, [112.407396, 34.674822], [123.47130774660502, 41.84335509132782], [123.49316642040111, 41.82358760727239], [123.29787518063169, 41.75258035044884], [112.488609, 34.73954], [123.4917341800821, 41.82657143993664], [112.475128, 34.737013], [112.4949466560549, 34.71138291337035], [113.88536854673778, 34.57638803590497], [123.34846835230725, 41.798897948381125], [123.45183864433959, 41.81164988000118], [113.85646566179754, 34.062066198507985], [113.84428769034497, 34.05769332241654], [112.42219472142524, 34.62068979968355], [112.412745489037, 34.68516742986535], [112.47134468676367, 34.63494873127024], [112.42893506071489, 34.66959629597626], [123.41743139579258, 41.782535999180865], [112.42430623855783, 34.681952797868774], [112.46885518426913, 34.700784928780735], [114.36369542880023, 36.14175442332978], [114.35168013631615, 36.108400366058184], [123.426802, 41.763088], [123.42663, 41.763187], [123.426713, 41.76324], [114.288889, 36.102362], [114.381731, 36.120789], [114.963274, 32.75746], [114.983035, 32.75174], [113.827193, 34.032089], [112.461395, 34.7068, 20]];
  graphsData = [
    {
      name: '折线',
      type: 'polyline',
      shape: {
        cx: PropTypes.number,
        cy: PropTypes.number,
        r: PropTypes.number,
        points: [[116.368904, 39.913423],
          [116.382122, 39.901176],
          [116.387271, 39.912501],
          [116.398258, 39.904600]],
      },
    },
    {
      name: '多边形',
      type: 'polygon',
      shape: {
        cx: PropTypes.number,
        cy: PropTypes.number,
        r: PropTypes.number,
        points: [
          [116.403322, 39.920255],
          [116.410703, 39.897555],
          [116.402292, 39.892353],
          [116.389846, 39.891365],
        ],
      },
    },
    {
      name: '圆形',
      type: 'circle',
      shape: {
        cx: 116.403322,
        cy: 39.920255,
        r: 1000,
      },
    },
    {
      name: '矩形',
      type: 'rectangle',
      shape: {
        cx: PropTypes.number,
        cy: PropTypes.number,
        r: PropTypes.number,
        points: [
          [116.376533, 39.907878],
          [116.414124, 39.940799],
        ],
      },
    },
  ];

  handleBoundsChanged = (bounds, center, zoom) => {
    console.log('bounds, center, zoom', bounds, center, zoom);
  }

  handleGraphsClick = (e) => {
    console.log('handleGraphsClick', e);
  }

  handleMarkerClick = (item) => {
    console.log('handleMarkerClick', item);
    // this.setState({ info: item.data });
  }

  handleRightClick = (event) => {
    console.log('handleRightClick', event);
  }

  items = [
    { text: '菜单1',
      onClick: (e1) => {
        console.log(e1);
      } },
    { text: '菜单2',
      onClick: (e1) => {
        console.log(e1);
      } },
    { text: '菜单3',
      onClick: (e1) => {
        console.log(e1);
      } },
  ]

  handleMassMarksClick = (data) => {
    console.log('handleMassMarksClick', data);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <MapNew
          option={{ mapStyle: 'dark' }}
          features={['bg', 'point', 'road', 'building']}
          onClick={this.handleClick}
          zoom={this.state.zoom}
          onBoundsChanged={this.handleBoundsChanged}
          useAMapUI
          // onRightClick={this.handleRightClick}
        >
          {/* <MapNew.Markers */}
          {/* zoomOnClick={false} */}
          {/* onClick={this.handleMarkerClick} */}
          {/* key="heatmapMarker" */}
          {/* data={this.heatmapData} */}
          {/* symbolOffset={[-10, -30]} */}
          {/* styles={this.state.mapMakersStyle} */}
          {/* /> */}
          {/* <MapNew.Graphs key="Graphs" data={this.graphsData} onClick={this.handleGraphsClick} /> */}
          {/* <MapNew.Boundary key="NewMap" areaCode={'21'} useCover itemStyle={{ color: '#fff' }} /> */}
          {/* <Map.ContextMenu key="ContextMenu" items={this.items} /> */}
          {/* <Map.ContextMenu */}
          {/* key="ContextMenu" content={<div */}
          {/* style={{ backgroundColor: '#fff' }} onClick={() => { */}
          {/* console.log('ContextMenu.contextMenuPositon', ContextMenu.contextMenuPositon); */}
          {/* }} */}
          {/* >nihao</div>} */}
          {/* /> */}
          {/* <MapNew.ToolBar key="ToolBar" /> */}
          {/* <MapNew.ControlBar key="ControlBar" /> */}
          {/* <MapNew.MapType key="MapType" /> */}
          {/* <MapNew.OverView key="OverView" /> */}
          {/* <MapNew.Scale key="Scale" /> */}
          {/* <MapNew.Geolocation key="Geolocation" /> */}
          {/* <MapNew.Heatmap key="Heapmap" data={heatmapData} /> */}
          {/* <Map.MassMarks key="MassMarks" data={massDataNew} onClick={this.handleMassMarksClick} /> */}
          <Map.Track
            key="Track"
            renderOptions={{
              pathLineStyle: {
                strokeStyle: 'red',
                lineWidth: 6,
                dirArrowStyle: true,
              },
            }}
            data={data}
          />
          {/* <MapNew.InfoWindow position={[112.73069298695866, 34.61250735697583]}> */}
          {/* {this.state.contentInfoWindow} */}
          {/* </MapNew.InfoWindow> */}
          {/* <MapNew.Autocomplete /> */}
        </MapNew>
      </div>
    );
  }
}
