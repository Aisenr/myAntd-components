import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import FlatMap from './FlatMap';

export default class ModalMap extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string,
  }

  static defaultProps = {
    label: '点击查看',
  }

  state = {
    visible: false,
  }

  handleHideModal = () => {
    this.setState({
      visible: false,
    });
  }

  handleShowMap = () => {
    this.setState({
      visible: true,
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.handleShowMap}>{this.props.label}</a>
        <Modal
          title="地理位置"
          visible={this.state.visible}
          onCancel={this.handleHideModal}
          bodyStyle={{ padding: 0 }}
          width={800}
          footer={null}
        >
          {this.state.visible && <FlatMap {...this.props} style={{ height: '500px' }} />}
        </Modal>
      </div>
    );
  }
}
