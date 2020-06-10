import React from 'react';
import PropTypes from 'prop-types';
import ParseCode from '../parse-code';

export default class Boundary extends React.PureComponent {

  static propTypes = {
    areaCode: PropTypes.string.isRequired,
    itemStyle: PropTypes.shape({
      color: PropTypes.string,
      borderColor: PropTypes.string,
      borderWidth: PropTypes.number,
      borderType: PropTypes.oneOf(['solid', 'dashed']),
    }),
    useCover: PropTypes.bool,
    fitView: PropTypes.bool,
  };

  static defaultProps = {
    areaCode: '',
    itemStyle: {
      color: 'rgba(255, 255, 255, 0)',
      borderColor: '#CC66CC',
      borderWidth: 1,
      borderType: 'solid',
    },
    useCover: false,
    fitView: true,
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.createBoundary(props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { areaCode } = this.props;
    if (areaCode !== nextProps.areaCode) this.createBoundary(nextProps);
  }

  componentWillUnmount() {
    if (this.polygon) {
      this.map.remove([this.polygon]);
    }
    if (this.polygonCover) {
      this.map.remove([this.polygonCover]);
    }
  }

  createBoundary(props) {
    const { areaCode } = props;
    const option = {
      subdistrict: 0,
      showbiz: false,
      extensions: 'all',
    };
    const newAreaCode = areaCode.toString();
    if (newAreaCode === '' || newAreaCode == null) {
      option.level = 'country';
      this.initBoundary('中国', option, props);
    } else if (newAreaCode.length >= 6) {
      option.level = 'district';
      this.initBoundary(newAreaCode, option, props);
    } else {
      option.level = newAreaCode.length === 2 ? 'province' : 'city';
      const obj = ParseCode.getObj(newAreaCode);
      this.initBoundary(obj.label, option, props);
    }
  }

  initBoundary(searchParam, option, props) {
    const { itemStyle: { color, borderColor, borderWidth, borderType }, useCover, fitView } = props;
    AMap.service('AMap.DistrictSearch', () => {
      const district = new AMap.DistrictSearch(option);
      district.search(searchParam, (status, result) => {
        const { boundaries: bounds } = result.districtList[0];
        if (this.polygon) {
          this.map.remove([this.polygon]);
        }
        if (this.polygonCover) {
          this.map.remove([this.polygonCover]);
        }
        if (bounds) {
          this.polygon = new AMap.Polygon({
            map: this.map,
            strokeWeight: borderWidth,
            strokeStyle: borderType,
            path: useCover ? [[[-180, 90], [-180, -90], [180, -90], [180, 90]], ...bounds] : bounds,
            fillColor: color,
            strokeColor: borderColor,
            bubble: true,
          });
          if (useCover) {
            this.polygonCover = new AMap.Polygon({
              bubble: true,
              path: bounds,
            });
            fitView && this.map.setFitView([this.polygonCover]);
          } else {
            fitView && this.map.setFitView([this.polygon]);
          }
        }
      });
    });
  }

  render() {
    return null;
  }
}
