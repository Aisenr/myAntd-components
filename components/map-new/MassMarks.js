import React from 'react';
import PropTypes from 'prop-types';
import { convertWgs84ToGcj02 } from './utils/coordtransform';

export default class MassMarks extends React.PureComponent {
  static propTypes = {
    zIndex: PropTypes.number,
    opacity: PropTypes.number,
    zooms: PropTypes.arrayOf(PropTypes.number),
    cursor: PropTypes.string,
    alwaysRender: PropTypes.bool,
    style: PropTypes.shape({
      anchor: PropTypes.arrayOf(PropTypes.number),
      url: PropTypes.string,
      size: PropTypes.arrayOf(PropTypes.number),
      rotation: PropTypes.number,
    }),
    data: PropTypes.arrayOf(PropTypes.array, PropTypes.object),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    zIndex: 111,
    opacity: 0.8,
    zooms: [3, 18],
    cursor: 'pointer',
    alwaysRender: false,
    style: {
      url: '//webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      anchor: [6, 15],
      size: [12, 15],
    },
    data: [],
    onClick() {},
  }

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.element = this.map.getContainer();
        this.createMassMarks(props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.createMassMarks(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.massMarks) this.map.remove(this.massMarks);
  }

  createMassMarks(props) {
    const { data, style } = props;
    const newData = this.convertCoord(data);
    if (this.massMarks) this.map.remove(this.massMarks);
    const { anchor, size } = style;
    const newStyle = {
      ...style,
      anchor: new AMap.Pixel(anchor[0], anchor[1]),
      size: new AMap.Size(size[0], size[1]),
    };
    this.massMarks = new AMap.MassMarks(newData, {
      ...props,
      style: newStyle,
    });
    this.massMarks.setMap(this.map);
    this.massMarks.on('click', this.handleClick);
  }

  handleClick = (e) => {
    this.props.onClick(e);
  }

  convertCoord(data) {
    return data.map((item, index) => {
      if (item instanceof Array) {
        const [item01, item02, ...rest] = item;
        const lnglat = convertWgs84ToGcj02(item01, item02);
        return {
          lnglat,
          id: index,
          ...rest,
        };
      }
      const lnglat = item.lnglat;
      const newlnglat = convertWgs84ToGcj02(lnglat[0], lnglat[1]);
      return {
        ...item,
        lnglat: newlnglat,
        id: item.id || index,
      };
    });
  }

  render() {
    return null;
  }

}
