import React from 'react';

/**
 * 数字格式化方法
 * @description 给数字添加逗号分隔符
 * @export  numberFormat
 * @date    2017-09-21
 * @author  zbs
 */
const NumberFormat = ({ value, decimalPlaces }) => {
  if (!value && value !== 0) return '';
  let strValue = value.toString();
  if (decimalPlaces) {
    const newValue = value.toFixed(parseInt(decimalPlaces) + 1);
    strValue = newValue.substring(0, newValue.toString().lastIndexOf('.') + parseInt(decimalPlaces) + 1);
  }
  const pointPlace = strValue.indexOf('.');
  if (pointPlace !== -1) {
    const intValue = strValue.substring(0, pointPlace);
    return <span>{`${intValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${strValue.substring(strValue.indexOf('.') + 1)}`}</span>;
  } else {
    return <span>{strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>;
  }
};

export default NumberFormat;
