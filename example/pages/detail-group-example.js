import React from 'react';
import {Container, DetailGroup, Panel} from '../../components';
import '../../components/container/style';

const items = [
  { label: '所属企业', dataIndex: 'enterpriseName' },
  { label: '车辆识别码', dataIndex: 'vin', size: 'two-column-wrap-item-span-2' },
  { label: '核定载质量', dataIndex: 'ratedLoadingMass', unit: '吨', columnSpans: { labelCol: { span: 4 }, wrapperCol: { span: 20 } } },
  { label: '容积', dataIndex: 'volume', unit: 'm³' },
  { label: '时间', dataIndex: 'createdDate' },
];

const dataSourceDetail = { msgGnsscenterId: null, dataId: '', createdDate: {}, lastModifiedDate: 1513738257147, id: '7965ce80-6304-48f9-9eb8-7acf390ac48f', clientId: 'E419255FD53148B99B6D357FF4072C7A', plateNumber: '豫A345HH', plateColor: 2, deviceId: '222333', type: 2, areaId: '210102', brandModel: '', engineNumber: '', vin: '', ratedLoadingMass: 12.0, volume: 123.0, transportLicenseId: '', registDate: 1501836298000, enterpriseId: 'E5E55DDD277749089CA58DEF3F26D481', enterpriseName: '沈阳运输企业', status: 5, pictures: [] };

export default class DetailGroupExample extends React.Component {

  render() {
    return (
      <Container>
        <Panel title="大宽度详情">
          <DetailGroup
            dataSource={dataSourceDetail}
            items={items}
            size="lg"
          />
        </Panel>
        <Panel title="中宽度详情">
          <DetailGroup
            size="md"
            dataSource={dataSourceDetail}
            items={items}
          />
        </Panel>
        <Panel title="小宽度详情">
          <DetailGroup
            size="sm"
            dataSource={dataSourceDetail}
            items={items}
          />
        </Panel>
        <Panel title="双列详情">
          <DetailGroup
            dataSource={dataSourceDetail}
            items={items}
            size="two-column-wrap"
          />
        </Panel>
        <Panel title="三列详情">
          <DetailGroup
            dataSource={dataSourceDetail}
            items={items}
            size="three-column-wrap"
          />
        </Panel>
      </Container>
    );
  }
}
