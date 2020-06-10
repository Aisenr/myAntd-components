import React from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class PictureList extends React.Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      suffix: PropTypes.string,
      size: PropTypes.number,
      description: PropTypes.string,
      thumbnailParams: PropTypes.string,
    })),
    imageSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  };

  static defaultProps = {
    images: [],
    thumbnailParams: 'x-oss-process=image/resize,w_200',
    imageSize: 'lg',
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      nowImg: {},
    };
  }

  onClickImg = (item) => {
    const { images } = this.props;
    const index = this.getElementIndex(images, item);
    this.setState({
      showModal: true,
      nowImg: item,
      previousCla: index <= 0 ? 'hidden' : 'previous',
      nextCla: images.length - 1 === index ? 'hidden' : 'next',
    });
  }

  getElementIndex = (arr, element) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url === element.url) return i;
    }
  }

  previous = () => {
    const { images } = this.props;
    const { nowImg } = this.state;
    if (!images.find(item => item.url === nowImg.url)) {
      return;
    }
    const index = this.getElementIndex(images, nowImg);
    const previousImg = images[index - 1 <= 0 ? 0 : index - 1];
    const previousCla = index - 1 <= 0 ? 'hidden' : 'previous';
    this.setState({
      nowImg: { ...previousImg },
      previousCla,
      nextCla: 'next',
    });
  }

  next = () => {
    const { images } = this.props;
    const { nowImg } = this.state;
    const index = this.getElementIndex(images, nowImg);
    const nextImg = images[index + 1];
    if (index >= images.length - 2) {
      this.setState({
        nowImg: nextImg,
        nextCla: 'hidden',
        previousCla: 'previous',
      });
    } else {
      this.setState({
        nowImg: nextImg,
        nextCla: 'next',
        previousCla: 'previous',
      });
    }
  }

  hideModal = () => {
    this.setState({
      showModal: false,
      nowImg: {},
    });
  }

  render() {
    const { prefixCls = 'bis-picture-list', className, style, images, thumbnailParams, imageSize } = this.props;
    const { showModal, nowImg, previousCla, nextCla } = this.state;
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        {
          images.map((item, index) => {
            const key = index;
            return <div key={`${item}-${key}`} className={`${prefixCls}-img-${imageSize}`} onClick={() => { this.onClickImg(item); }}><img alt="" src={`${item.url}?${thumbnailParams}`} /></div>;
          })
        }
        <Modal
          width="1080px"
          wrapClassName={`${prefixCls}-vertical-center-modal`}
          visible={showModal}
          onCancel={this.hideModal}
          footer={null}
          bodyStyle={{ textAlign: 'center', height: '80vh' }}
          destroyOnClose
        >
          <div className={`${prefixCls}-enlarge`}>
            <div className={`${prefixCls}-${previousCla}`} onClick={() => this.previous()} />
            <img alt="" src={nowImg.url} style={{ maxWidth: '1000px', maxHeight: '100%' }} />
            <div className={`${prefixCls}-${nextCla}`} onClick={() => this.next()} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default PictureList;
