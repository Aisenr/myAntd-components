import React from 'react';
/**
 * 行尾省略号组件
 * @description 当一行内容过多时，行尾显示省略号
 * @export  Ellipsis
 * @date    2017-09-21
 * @author  zbs
 */
const Ellipsis = ({ value }) => {
  const prefixCls = 'bis-ellipsis';
  return (<span className={prefixCls} title={value}>{value}</span>);
};

export default Ellipsis;
