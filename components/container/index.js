import React, { Component } from 'react';
import { Spin, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';

export function urlToList(url) {
  const urlList = url.split('/').filter(i => i);
  return urlList.map((urlItem, index) => {
    return `/${urlList.slice(0, index + 1).join('/')}`;
  });
}

/**
 * 容器组件
 * @description 作为其他业务组件的容器组件，可放置子组件
 * @export  Container
 * @date    2017-09-21
 * @author  zbs
 */
class Container extends Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    loading: PropTypes.bool,
    title: PropTypes.string,
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
    breadcrumbSeparator: PropTypes.string,
    breadcrumb: PropTypes.bool,
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
  };
  static defaultProps = {
    className: '',
    style: {},
    title: '',
    loading: false,
    extra: null,
    breadcrumbSeparator: ' > ',
    breadcrumb: false,
    link: 'a',
  };

  static contextTypes = {
    currentPathname: PropTypes.string,
    routerData: PropTypes.object,
  }

  conversionFromLocation = () => {
    const { breadcrumbSeparator, link: Link } = this.props;
    const { routerData, currentPathname } = this.context;
    const pathSnippets = urlToList(currentPathname);
    const newPathSnippets = [];
    for (const path of Object.keys(routerData)) {
      for (const item of pathSnippets) {
        if (pathToRegexp(path).exec(item)) {
          newPathSnippets.push({ path, item });
          break;
        }
      }
    }
    const extraBreadcrumbItems = newPathSnippets.map((pathObj, index) => {
      return (
          (index === newPathSnippets.length - 1)
          ?
          (<Breadcrumb.Item key={pathObj.path}>
            {routerData[pathObj.path].name}
          </Breadcrumb.Item>)
          :
          (<Breadcrumb.Item key={pathObj.path}>
            {
                Link === 'a'
                ?
                  <Link href={pathObj.item}>{routerData[pathObj.path].name}</Link>
                :
                  <Link to={pathObj.item}>{routerData[pathObj.path].name}</Link>
              }

          </Breadcrumb.Item>)
      );
    });
    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {Link === 'a' ? <Link href="/">首页</Link> : <Link to="/">首页</Link>}
      </Breadcrumb.Item>,
    );
    return (
      <Breadcrumb className={'bis-container-breadcrumb'} separator={breadcrumbSeparator}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  };

  render() {
    const { prefixCla = 'bis-container', className, style, loading, title, extra, children, breadcrumb } = this.props;
    return (
      <div className={classNames(prefixCla, className)} style={style} >
        {breadcrumb && this.conversionFromLocation()}
        <Spin spinning={loading}>
          {title && <div className={`${prefixCla}-title`}>{title}</div>}
          {extra && <div className={`${prefixCla}-extra`}>{extra}</div>}
          <div className={`${prefixCla}-children`}>{children}</div>
        </Spin>
      </div>
    );
  }
}

export default Container;
