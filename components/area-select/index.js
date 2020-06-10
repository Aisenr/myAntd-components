import React from 'react';
import PropTypes from 'prop-types';
import AreaSelectModal from '../area-select-modal';
import AreaSelectCascader from '../area-select-cascader';
import AreaSelectOneLevel from '../area-select-one-level';

/**
 * 地区选择下拉框组件
 * @description 地区选择下拉框
 * @export  AreaSelect
 * @date    2017-09-21
 * @author  zbs
 */
class AreaSelect extends React.Component {

  render() {
    const { display } = this.props;
    return (
      <div>
        {display === 'modal' && <AreaSelectModal {...this.props} />}
        {display === 'cascader' && <AreaSelectCascader {...this.props} />}
        {display === 'oneLevel' && <AreaSelectOneLevel {...this.props} />}
      </div>
    );
  }
}

export default AreaSelect;

AreaSelect.defaultProps = {
  display: 'cascader',
};

AreaSelect.propTypes = {
  display: PropTypes.oneOf(['modal', 'cascader', 'oneLevel']),
};

AreaSelect.cache = {};
