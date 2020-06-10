import React from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import './bmap/bmap';
import { convertWgs84ToBd09, convertBd09ToWgs84 } from './coordtransform';

const mapOption = {
  animation: true,
  bmap: {
    roam: true,
    mapOptions: {
      enableMapClick: false,
    },
  },
  tooltip: {
    show: true,
    trigger: 'item',
    formatter(params) {
      return params.name;
    },
  },
  series: [],
};

export default class Map extends React.Component {

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    option: PropTypes.object,
    onClick: PropTypes.func,
    onBoundsChanged: PropTypes.func,
  };

  static defaultProps = {
    center: [104.114129, 37.550339],
    zoom: 5,
    option: {},
    onClick() {},
    onBoundsChanged() {},
  };
  constructor(props) {
    super(props);
    this.state = {
      center: convertWgs84ToBd09(props.center[0], props.center[1]),
      zoom: props.zoom,
    };
  }

  componentDidMount() {
    this.chart = echarts.init(this.container);
    this.chart.setOption(this.getOption());

    this.map = this.chart.getModel().getComponent('bmap').getBMap();
    this.map.enableAutoResize();

    this.props.mapStyle && this.map.setMapStyle(this.props.mapStyle);

    this.map.addEventListener('resize', this.handleResize);
    this.map.addEventListener('click', this.handleMapClick);
    this.map.addEventListener('zoomend', this.handleBoundsChange);
    this.map.addEventListener('moveend', this.handleBoundsChange);
  }

  handleBoundsChange = () => {
    this.changeBounds();
  }

  changeBounds() {
    const mapCenter = this.map.getCenter();
    const bounds = this.map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    this.props.onBoundsChanged(
      [...convertBd09ToWgs84(northEast.lng, northEast.lat), ...convertBd09ToWgs84(southWest.lng, southWest.lat)],
      convertBd09ToWgs84(mapCenter.lng, mapCenter.lat),
      this.map.getZoom(),
    );
  }

  handleResize = () => {
    if (this.chart) {
      this.chart.resize();
    }
  };

  handleMapClick = (e) => {
    this.props.onClick({
      ...e.domEvent.data,
      point: convertBd09ToWgs84(e.point.lng, e.point.lat),
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.center && nextProps.center !== this.props.center) {
      this.setState({ center: convertWgs84ToBd09(nextProps.center[0], nextProps.center[1]) });
    }

    if (nextProps.zoom && nextProps.zoom !== this.props.zoom) {
      this.setState({ zoom: nextProps.zoom });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.center !== this.props.center || prevProps.zoom !== this.props.zoom || prevProps.option !== this.props.option) {
      setTimeout(() => this.setOptions(this.getOption()), 0);
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.removeEventListener('resize', this.handleResize);
      this.map.removeEventListener('click', this.handleMapClick);
      this.map.removeEventListener('zoomend', this.handleBoundsChange);
      this.map.removeEventListener('moveend', this.handleBoundsChange);
      this.map = null;
    }

    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  setOptions(options) {
    if (this.chart) {
      this.chart.setOption(options, false, true);
    }
  }

  getOption() {
    const bmap = { ...mapOption.bmap, ...this.props.option.bmap };
    if (this.state.center) {
      bmap.center = this.state.center;
    }
    if (this.state.zoom) {
      bmap.zoom = this.state.zoom;
    }
    return {
      ...mapOption,
      bmap,
    };
  }

  setContainer = (item) => { this.container = item; };

  renderChildren() {
    const { children } = this.props;
    if (!children) {
      return;
    }

    return React.Children.map(children, (child) => {
      if (child) {
        return React.cloneElement(child, {
          map: this,
          id: child.key || child.name,
          name: child.props.name || child.key,
        });
      }
    });
  }

  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        <div ref={this.setContainer} style={{ height: '100%' }} />
        {this.renderChildren()}
      </div>
    );
  }
}
