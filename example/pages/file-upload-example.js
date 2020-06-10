import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import { FileUpload } from '../../components';
import '../../components/file-upload/style';

export default class EllipsisExample extends React.Component {

  state = {
    fileList: [{
      name: '中国地图简介.txt',
      url: 'http://www.baidu.com',
      suffix: 'txt',
      size: 1230,
      description: 'description',
    }],
    imgList: [{
      name: '中国地图简介.png',
      url: 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=0&spn=0&di=97948933610&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3588772980%2C2454248748&os=1031665791%2C326346256&simid=0%2C0&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0142135541fe180000019ae9b8cf86.jpg%401280w_1l_2o_100sh.png&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bzv55s_z%26e3Bv54_z%26e3BvgAzdH3Fo56hAzdH3FZNzMxNTI8M2%3D%3D_z%26e3Bip4s&gsm=0&islist=&querylist=',
      suffix: 'png',
      size: 1230,
      description: 'description',
    }],
  }

  handleChange = (param) => {
    console.log('EllipsisExample', param);
    console.log('FileUpload.uploadingCount', FileUpload.uploadingCount);
  }

  render() {
    return (
      <div style={{ marginLeft: '40px' }}>
        图片上传：<FileUpload value={this.state.imgList} action="/bis/basic-service/oss/singleFile" deleteAction="/bis/basic-service/oss/file" onChange={this.handleChange} />
        附件上传：<FileUpload listType="attachment" action="/api/files" deleteAction="/bis/basic-service/oss/file" value={this.state.fileList} onChange={this.handleChange} />
      </div>
    );
  }
}
