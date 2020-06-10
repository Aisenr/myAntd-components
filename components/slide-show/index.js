import React from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 轮播组件
 * @description 循环播放图片
 * @export  SlideShow
 * @date    2017-09-21
 * @author  zbs
 */
export default class SlideShow extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    dataSource: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      src: PropTypes.string,
    })),
    onClick: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    style: {},
    dataSource: [],
    width: '',
    height: '100%',
    onClick() {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isAuto: props.dataSource && props.dataSource.length > 1,
      isDots: props.dataSource && props.dataSource.length > 1,
      effect: props.dataSource && props.dataSource.length === 1 ? 'fade' : 'scrollx',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource && nextProps.dataSource.length <= 1) {
      this.setState({
        isAuto: false,
        isDots: false,
        effect: 'fade',
      });
    } else {
      this.setState({
        isAuto: true,
        isDots: true,
        effect: 'scrollx',
      });
    }
  }

  render() {
    const { prefixCls = 'bis-slide-show', className, dataSource, width, height, onClick } = this.props;
    const { effect, isAuto, isDots } = this.state;
    return (
      <div className={classNames(prefixCls, className)} style={this.props.style} >
        <Carousel effect={effect} dotsClass={'slick-dots'} autoplay={isAuto} dots={isDots}>
          {
            dataSource && dataSource.map((item, index) => {
              return (
                <div key={item.key || index} className={`${prefixCls}-img-outer`} style={{ width, height, lineHeight: height }}>
                  <img
                    alt={item.title}
                    src={item.src}
                    title={item.title}
                    height="100%"
                    onClick={e => onClick(item, index, e)}
                  />
                  {
                    item.title && (
                    <div className={`${prefixCls}-annotation-info`}>
                      { item.title }
                    </div>
                    )
                  }
                </div>
              );
            })
          }
        </Carousel>
      </div>
    );
  }
}
