import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const Search = Input.Search;

/**
 * 搜索输入框组件
 * @description 搜索输入框
 * @export  SearchInput
 * @date    2017-09-21
 * @author  zbs
 */
class SearchInput extends React.Component {
  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        <Search {...this.props} style={{ width: '100%' }} />
      </div>
    );
  }
}

export default SearchInput;

SearchInput.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};
