import React from 'react';
import FlatMap from './FlatMap';
import ModalMap from './ModalMap';

export default class GeoMapNew extends React.PureComponent {
  render() {
    const { display } = this.props;
    return (
      display === 'modal' ? <ModalMap {...this.props} /> : <FlatMap {...this.props} />
    );
  }
}
