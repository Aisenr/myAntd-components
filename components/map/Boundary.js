import React from 'react';
import PropTypes from 'prop-types';

const itemStyleConvertMap = {
  color: 'fillColor',
  borderColor: 'strokeColor',
  borderWidth: 'strokeWeight',
  borderType: 'strokeStyle',
};

export default class Boundary extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    itemStyle: PropTypes.shape({
      color: PropTypes.string,
      borderColor: PropTypes.string,
      borderWidth: PropTypes.number,
      borderType: PropTypes.oneOf(['solid', 'dashed']),
    }),
  };

  static defaultProps = {
    itemStyle: {
      color: '#00000000',
    },
  };

  componentDidMount() {
    setTimeout(() => {
      this.map = this.props.map.map;
      this.drawBoundary(this.props.name);
    }, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      if (this.polygons) {
        this.polygons.forEach(polygon => this.map.removeOverlay(polygon));
      }
      this.drawBoundary(this.props.name);
    }
  }

  componentWillUnmount() {
    if (this.polygons) {
      this.polygons.forEach(polygon => this.map.removeOverlay(polygon));
      this.polygons = null;
      this.map = null;
    }
  }

  getPolygonOption() {
    const option = { enableClicking: false };
    Object.keys(itemStyleConvertMap).forEach((key) => {
      if (this.props.itemStyle[key]) {
        option[itemStyleConvertMap[key]] = this.props.itemStyle[key];
      }
    });
    return option;
  }

  drawBoundary(name) {
    if (!name) {
      return;
    }

    new BMap.Boundary().get(name, ({ boundaries }) => {
      if (this.map && this.props.name === name && boundaries.length > 0) {
        const polygonOption = this.getPolygonOption();
        this.polygons = boundaries.map(boundary => new BMap.Polygon(boundary, polygonOption));
        this.polygons.forEach(polygon => this.map.addOverlay(polygon));
      }
    });
  }

  render() {
    return null;
  }
}
