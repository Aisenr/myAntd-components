import React from 'react';
import { OverallDetails, SlideShow, DetailGroup } from '../../components';
import '../../components/overall-details/style';
import '../../components/detail-group/style';

const items = [
  { label: '所属企业', dataIndex: 'enterpriseName' },
  { label: '车辆识别码', dataIndex: 'vin' },
  { label: '核定载质量', dataIndex: 'ratedLoadingMass', unit: '吨' },
  { label: '容积', dataIndex: 'volume', unit: 'm³' },
];

const dataSourceDetail = { msgGnsscenterId: null, dataId: '', createdDate: 1513680456846, lastModifiedDate: 1513738257147, id: '7965ce80-6304-48f9-9eb8-7acf390ac48f', clientId: 'E419255FD53148B99B6D357FF4072C7A', plateNumber: '豫A345HH', plateColor: 2, deviceId: '222333', type: 2, areaId: '210102', brandModel: '', engineNumber: '', vin: '23211222', ratedLoadingMass: 12.0, volume: 123.0, transportLicenseId: '', registDate: 1501836298000, enterpriseId: 'E5E55DDD277749089CA58DEF3F26D481', enterpriseName: '沈阳运输企业', status: 5, pictures: [] };

const dataSourceSlide = [{ src: '../images/ysqy.jpg' }];
//, { src: '../images/ytxx.jpg' }, { src: '../images/zyxx.png' }

export default class OverallDetailsExample extends React.Component {
  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <OverallDetails
          introductionTitle="项目介绍"
          introduction={'暂无信息项目介绍内容'}
          title="标题"
        >
          <SlideShow dataSource={dataSourceSlide} height="300px" />
          <DetailGroup
            size="md"
            title="项目名称"
            dataSource={dataSourceDetail}
            items={items}
          />
        </OverallDetails>
      </div>
    );
  }
}
