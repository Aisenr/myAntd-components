import React from 'react';
import { Container, Panel, FieldSet } from '../../components';
import '../../components/container/style';
import '../../components/field-set/style';

export default class ContainerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
    };
  }

  data = {
    '/': {
      component: () => {},
    },
    '/home': {
      name: '列表',
      component: () => {},
    },
    '/home/container-example': {
      name: '容器',
      component: () => {},
    },
  }
  render() {
    return (
      <Container title="Container" extra="更多" locationPathname={this.props.location.pathname} routerData={this.data}>
        <Panel title="Panel" extra={<span>更多</span>} >
          <FieldSet title="FieldSet" extra="更多" >
            Content
          </FieldSet>
          <FieldSet title="FieldSet" extra="更多" >
            Content
          </FieldSet>
          <FieldSet title="FieldSet" extra="更多" >
            Content
          </FieldSet>
        </Panel>
        <Panel title="Panel" extra="更多" >
          <FieldSet title="FieldSet" extra="更多" >
            Content
          </FieldSet>
          <FieldSet title="FieldSet" extra="更多" >
            Content
          </FieldSet>
          <FieldSet title="FieldSet" extra="更多" >
            Content
          </FieldSet>
        </Panel>
      </Container>
    );
  }
}
