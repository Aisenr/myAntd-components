import React from 'react';
import {
  Upload,
  Button,
  Icon,
  message,
  Popconfirm,
} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import InputItem from '../input-item';

/**
 * 文件列表展示
 * @description 文件列表展示
 * @export  FileUpload
 * @date    2018-03-27
 * @author  zbs
 */
export default class FileList extends React.Component {

  static propTypes = {
    fileList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      suffix: PropTypes.string,
      size: PropTypes.number,
      description: PropTypes.string,
    })),
  }

  static defaultProps = {
    fileList: [],
  }

  constructor(props) {
    super(props);
    const { fileList } = props;
    this.state = {
      fileList,
    };
  }

  render() {
    const { prefixCls = 'bis-file-list', className, style, fileList } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={style} >
        {
          fileList.map((item, index) => {
            const key = `${item.url}-${index}`;
            const { size } = item;
            const fileSize = size && size > 1000000 ? `${(size / 1024 / 1024).toFixed(2)}MB` : (size > 1000 ? `${(size / 1024).toFixed(2)}KB` : `${size}B`);
            return (
              <div key={key}>
                <a href={item.url} target="_blank">
                  <Icon type="paper-clip" className={`${prefixCls}-icon`} />{item.name}
                </a>
                {item.description && <span> - {item.description}</span>}
                <span className={`${prefixCls}-size`}>({fileSize})</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}
