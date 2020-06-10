'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _breadcrumb = require('antd/lib/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

exports.urlToList = urlToList;

require('antd/lib/spin/style');

require('antd/lib/breadcrumb/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function urlToList(url) {
  var urlList = url.split('/').filter(function (i) {
    return i;
  });
  return urlList.map(function (urlItem, index) {
    return '/' + urlList.slice(0, index + 1).join('/');
  });
}

/**
 * 容器组件
 * @description 作为其他业务组件的容器组件，可放置子组件
 * @export  Container
 * @date    2017-09-21
 * @author  zbs
 */
var Container = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Container, _Component);

  function Container() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Container);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call.apply(_ref, [this].concat(args))), _this), _this.conversionFromLocation = function () {
      var _this$props = _this.props,
          breadcrumbSeparator = _this$props.breadcrumbSeparator,
          Link = _this$props.link;
      var _this$context = _this.context,
          routerData = _this$context.routerData,
          currentPathname = _this$context.currentPathname;

      var pathSnippets = urlToList(currentPathname);
      var newPathSnippets = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(routerData)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var path = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(pathSnippets), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var item = _step2.value;

              if ((0, _pathToRegexp2.default)(path).exec(item)) {
                newPathSnippets.push({ path: path, item: item });
                break;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var extraBreadcrumbItems = newPathSnippets.map(function (pathObj, index) {
        return index === newPathSnippets.length - 1 ? _react2.default.createElement(
          _breadcrumb2.default.Item,
          { key: pathObj.path },
          routerData[pathObj.path].name
        ) : _react2.default.createElement(
          _breadcrumb2.default.Item,
          { key: pathObj.path },
          Link === 'a' ? _react2.default.createElement(
            Link,
            { href: pathObj.item },
            routerData[pathObj.path].name
          ) : _react2.default.createElement(
            Link,
            { to: pathObj.item },
            routerData[pathObj.path].name
          )
        );
      });
      // Add home breadcrumbs to your head
      extraBreadcrumbItems.unshift(_react2.default.createElement(
        _breadcrumb2.default.Item,
        { key: 'home' },
        Link === 'a' ? _react2.default.createElement(
          Link,
          { href: '/' },
          '\u9996\u9875'
        ) : _react2.default.createElement(
          Link,
          { to: '/' },
          '\u9996\u9875'
        )
      ));
      return _react2.default.createElement(
        _breadcrumb2.default,
        { className: 'bis-container-breadcrumb', separator: breadcrumbSeparator },
        extraBreadcrumbItems
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Container, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCla = _props.prefixCla,
          prefixCla = _props$prefixCla === undefined ? 'bis-container' : _props$prefixCla,
          className = _props.className,
          style = _props.style,
          loading = _props.loading,
          title = _props.title,
          extra = _props.extra,
          children = _props.children,
          breadcrumb = _props.breadcrumb;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCla, className), style: style },
        breadcrumb && this.conversionFromLocation(),
        _react2.default.createElement(
          _spin2.default,
          { spinning: loading },
          title && _react2.default.createElement(
            'div',
            { className: prefixCla + '-title' },
            title
          ),
          extra && _react2.default.createElement(
            'div',
            { className: prefixCla + '-extra' },
            extra
          ),
          _react2.default.createElement(
            'div',
            { className: prefixCla + '-children' },
            children
          )
        )
      );
    }
  }]);
  return Container;
}(_react.Component), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  loading: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  extra: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.array]),
  breadcrumbSeparator: _propTypes2.default.string,
  breadcrumb: _propTypes2.default.bool,
  link: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.func])
}, _class.defaultProps = {
  className: '',
  style: {},
  title: '',
  loading: false,
  extra: null,
  breadcrumbSeparator: ' > ',
  breadcrumb: false,
  link: 'a'
}, _class.contextTypes = {
  currentPathname: _propTypes2.default.string,
  routerData: _propTypes2.default.object
}, _temp2);
exports.default = Container;