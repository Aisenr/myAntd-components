import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import '../../components/container/style';

export default class Home extends React.Component {
  render() {
    return (
      <div style={{ margin: '0 60px' }}>
        <Row gutter={8} style={{ marginTop: '24px' }}>
          <Col span={12}>
            <div>展示</div>
            <Link to="/slide-show-example">slide-show-example</Link><br />
            <Link to="/picture-list-example">picture-list-example</Link><br />
            <Link to="/file-list-example">file-list-example</Link><br />
          </Col>
          <Col span={12}>
            <div>列表类</div>
            <Link to="/rank-list-example">rank-list-example</Link><br />
            <Link to="/info-list-example">info-list-example</Link><br />
            <Link to="/news-panel-example">news-panel-example</Link><br />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '24px' }}>
          <Col span={12}>
            <div>地图</div>
            <Link to="/echarts-china-map-example">echarts-china-map-example</Link><br />
            <Link to="/geo-map-example">geo-map-example</Link><br />
            <Link to="/geo-map-new-example">geo-map-new-example</Link><br />
            <Link to="/map-new-example">map-new-example</Link><br />
            <Link to="/position-show-new-example">position-show-new-example</Link><br />
            <Link to="/position-input-box-new-example">position-input-box-new-example</Link><br />
            <Link to="/select-area-new-example">select-area-new-example</Link><br />
            <Link to="/select-point-new-example">select-point-new-example</Link><br />
            <Link to="/select-route-new-example">select-route-new-example</Link><br />
            <Link to="/position-input-box-example">position-input-box-example</Link><br />
            <Link to="/position-show-example">position-show-example</Link><br />
            <Link to="/select-point-example">select-point-example</Link><br />
            <Link to="/select-area-example">select-area-example</Link><br />
            <Link to="/select-route-example">select-route-example</Link><br />
            <Link to="/map-example">map-example</Link><br />
            <Link to="/geo-map-example">geo-map-example</Link><br />
          </Col>
          <Col span={12}>
            <div>表单</div>
            <Link to="/form-group-example">form-group-example</Link><br />
            <Link to="/password-input-box-example">password-input-box-example</Link><br />
            <Link to="/select-item-example">select-item-example</Link><br />
            <Link to="/area-select-example">area-select-example</Link><br />
            <Link to="/sms-verification-code-example">sms-verification-code-example</Link><br />
            <Link to="/rich-text-editor-example">rich-text-editor-example</Link><br />
            <Link to="/time-interval-example">time-interval-example</Link><br />
            <Link to="/file-upload-example">file-upload-example</Link><br />
            <Link to="/date-picker-example">date-picker-example</Link><br />
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '24px' }}>
          <Col span={12}>
            <div>格式化工具</div>
            <Link to="/counter-animation-example">counter-animation-example</Link><br />
            <Link to="/date-format-example">date-format-example</Link><br />
            <Link to="/ellipsis-example">ellipsis-example</Link><br />
            <Link to="/number-format-example">number-format-example</Link><br />
            <Link to="/parse-code-example">parse-code-example</Link><br />
          </Col>
          <Col span={12}>
            <div>信息卡片</div>
            <Link to="/dynamic-info-horizontal-example">dynamic-info-horizontal-example</Link><br />
            <Link to="/dynamic-info-vertical-example">dynamic-info-vertical-example</Link><br />
            <Link to="/dynamic-info-vertical-second-example">dynamic-info-vertical-second-example</Link><br />
            <Link to="/detail-group-example">detail-group-example</Link><br />
            <Link to="/info-card-example">info-card-example</Link><br />
            <Link to="/overall-details-example">overall-details-example</Link>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '24px' }}>
          <Col span={12}>
            <div>容器</div>
            <Link to="/container-example">container-example</Link>
          </Col>
          <Col span={12}>
            <div>其他</div>
            <Link to="/list-table-example">list-table-example</Link><br />
            <Link to="/message-item-example">message-item-example</Link><br />
            <Link to="/echarts-example">echarts-example</Link><br />
            <Link to="/upload-button-example">upload-button-example</Link><br />
          </Col>
        </Row>
      </div>
    );
  }
}
