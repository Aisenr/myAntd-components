import React from 'react';
import { Ellipsis } from '../../components';
import '../../components/ellipsis/style';

export default class EllipsisExample extends React.Component {

  render() {
    return (
      <div style={{ width: '100px', fontSize: '18px', margin: '40px auto' }}>
        <Ellipsis value="多余的部分将一省略号的形式呈现" />
      </div>
    );
  }
}
