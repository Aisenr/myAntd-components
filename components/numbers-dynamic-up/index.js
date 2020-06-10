import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

/**
 * 数字滚动增加组件
 * @description 在数字初始化，或者变动时，伴随滚动生成效果
 * @export  NumbersDynamicUp
 * @date    2017-09-21
 * @author  zbs
 */
class NumbersDynamicUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { start: 0 };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ start: this.props.end });
  }

  render() {
    return (
      <CountUp className={this.props.className} start={this.state.start} end={this.props.end} duration={this.props.duration} useGrouping separator="," />
    );
  }
}

NumbersDynamicUp.defaultProps = {
  end: 0,
  duration: 0.5,
};

NumbersDynamicUp.propTypes = {
  className: PropTypes.string,
  end: PropTypes.number,
  duration: PropTypes.number,
};

export default NumbersDynamicUp;
