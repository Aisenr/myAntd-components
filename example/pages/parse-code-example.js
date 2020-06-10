import React from 'react';
import { ParseCode } from '../../components';
import '../../components/parse-code/style';

ParseCode.cache = {
  // 垃圾分类
  wasteType1: [
    { value: 1, label: '工程渣土' },
    { value: 2, label: '工程泥浆' },
    { value: 3, label: '工程垃圾' },
    { value: 4, label: '拆除垃圾' },
    { value: 5, label: '装修垃圾' },
  ],
};

export default class ParseCodeExample extends React.Component {
  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <ParseCode value="1101" type="pca" />
        <ParseCode value={1} type="wasteType1" />
      </div>
    );
  }
}
