import React from 'react';
import { SlideShow } from '../../components';
import '../../components/slide-show/style';

const bannerImgs = [
  { src: '../images/1.jpg' },
  { src: '../images/0.jpg' },
  { src: '../images/2.jpg' },
  { src: '../images/3.png' },
];

export default class SlideShowExample extends React.Component {

  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <SlideShow dataSource={bannerImgs} style={{ marginTop: '40px' }} />
      </div>
    );
  }
}
