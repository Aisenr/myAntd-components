import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NumbersDynamicUp from '../numbers-dynamic-up';

/**
 * 数字增加或减少动画
 * @description 数字增减时，会显示 +num/-num 的动画
 * @export  CounterAnimation
 * @date    2017-09-21
 * @author  zbs
 */
export default class CounterAnimation extends PureComponent {

  state = { delta: 0, style: this.startStyle };

  componentWillReceiveProps(nextProps) {
    const delta = nextProps.delta || nextProps.end - this.props.end;
    if (delta === 0) {
      return;
    }
    this.setState({ delta, style: delta > 0 ? this.plusStyle : this.minusStyle });
    this.timeout = setTimeout(() => {
      this.setState({ delta: 0, style: this.startStyle });
      this.timeout = null;
    }, 1000);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.end === this.props.end) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  startStyle = { transition: '1s', position: 'absolute', top: '0', right: '-30px', fontSize: 'smaller', opacity: 1 };

  plusStyle = { transition: '1s', position: 'absolute', top: '-30px', right: '-30px', opacity: 0, fontSize: 'smaller' };

  minusStyle = { transition: '1s', position: 'absolute', top: '15px', right: '-30px', opacity: 0, fontSize: 'smaller' };


  render() {
    let delta = this.state.delta;
    if (!this.props.showDifference) {
      delta = 0;
    }
    return (
      <span className={this.props.className} style={{ position: 'relative', display: 'inline-block', ...this.props.style }}>
        {<div style={this.state.style}>
          {delta === 0 ? '' : delta > 0 ? `+${delta}` : delta}
        </div>}
        <NumbersDynamicUp end={this.props.end} duration={this.props.duration} />
      </span>


    );
  }
}

CounterAnimation.defaultProps = {
  end: 0,
  duration: 1,
  className: '',
  style: null,
  showDifference: true,
};

CounterAnimation.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  end: PropTypes.number,
  duration: PropTypes.number,
  showDifference: PropTypes.bool,
};
