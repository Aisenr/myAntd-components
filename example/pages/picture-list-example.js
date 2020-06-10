import React from 'react';
import { PictureList } from '../../components';
import '../../components/picture-list/style';

const images = [
  {
    uid: 1,
    name: '中国地图简介.txt',
    url: '../images/ysqy.jpg',
    suffix: 'txt',
    size: 1230,
  },
  {
    uid: 2,
    name: '中国地图简介.txt',
    url: '../images/ytxx.jpg',
    suffix: 'txt',
    size: 1230,
  },
  {
    uid: 3,
    name: '中国地图简介.txt',
    url: '../images/zyxx.png',
    suffix: 'txt',
    size: 1230,
  },
  {
    uid: 3,
    name: '中国地图简介.txt',
    url: '../images/sc.png',
    suffix: 'txt',
    size: 1230,
  },
];

export default class PictureListExample extends React.Component {
  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <PictureList images={images} imageSize="sm" />
      </div>
    );
  }
}
