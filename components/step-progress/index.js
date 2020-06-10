import React from 'react';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import Ellipsis from '../ellipsis';
import DateFormat from '../date-format';
import classNames from 'classnames';

const Step = Steps.Step;

/**
 * 进度条组件
 * @description 步骤进度条
 * @export  StepProgress
 * @date    2017-09-21
 * @author  zbs
 */
class StepProgress extends React.Component {
  render() {
	  const { prefixCla = 'bis-step-progress', className } = this.props;
    return (
      <div style={this.props.style} className={classNames(prefixCla, className)} >
        <Steps direction="vertical" size="small" current={this.props.dataSource && this.props.dataSource.length - 1}>
          {
						this.props.dataSource && this.props.dataSource.map((item, index) => {
  return (
    <Step
      key={item.key || index}
      title={item.status}
      description={
        <div>
          <sapn className={`${prefixCla}-info`}>
            <Ellipsis value={item.information} />
          </sapn>
          <sapn className={`${prefixCla}-time`}>
            <DateFormat value={item.time} format="YYYY-MM-DD hh:mm" />
          </sapn>
        </div>
									}
    />
  );
})
					}
        </Steps>
      </div>
    );
  }
}

export default StepProgress;

StepProgress.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  dataSource: PropTypes.array,
};
