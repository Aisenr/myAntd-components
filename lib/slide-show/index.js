'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _carousel = require('antd/lib/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

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

var _class, _temp;

require('antd/lib/carousel/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 轮播组件
 * @description 循环播放图片
 * @export  SlideShow
 * @date    2017-09-21
 * @author  zbs
 */
var SlideShow = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(SlideShow, _React$PureComponent);

  function SlideShow(props) {
    (0, _classCallCheck3.default)(this, SlideShow);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SlideShow.__proto__ || (0, _getPrototypeOf2.default)(SlideShow)).call(this, props));

    _this.state = {
      isAuto: props.dataSource && props.dataSource.length > 1,
      isDots: props.dataSource && props.dataSource.length > 1,
      effect: props.dataSource && props.dataSource.length === 1 ? 'fade' : 'scrollx'
    };
    return _this;
  }

  (0, _createClass3.default)(SlideShow, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.dataSource && nextProps.dataSource.length <= 1) {
        this.setState({
          isAuto: false,
          isDots: false,
          effect: 'fade'
        });
      } else {
        this.setState({
          isAuto: true,
          isDots: true,
          effect: 'scrollx'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-slide-show' : _props$prefixCls,
          className = _props.className,
          dataSource = _props.dataSource,
          width = _props.width,
          height = _props.height,
          _onClick = _props.onClick;
      var _state = this.state,
          effect = _state.effect,
          isAuto = _state.isAuto,
          isDots = _state.isDots;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: this.props.style },
        _react2.default.createElement(
          _carousel2.default,
          { effect: effect, dotsClass: 'slick-dots', autoplay: isAuto, dots: isDots },
          dataSource && dataSource.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              { key: item.key || index, className: prefixCls + '-img-outer', style: { width: width, height: height, lineHeight: height } },
              _react2.default.createElement('img', {
                alt: item.title,
                src: item.src,
                title: item.title,
                height: '100%',
                onClick: function onClick(e) {
                  return _onClick(item, index, e);
                }
              }),
              item.title && _react2.default.createElement(
                'div',
                { className: prefixCls + '-annotation-info' },
                item.title
              )
            );
          })
        )
      );
    }
  }]);
  return SlideShow;
}(_react2.default.PureComponent), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.string,
    title: _propTypes2.default.string,
    src: _propTypes2.default.string
  })),
  onClick: _propTypes2.default.func,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string
}, _class.defaultProps = {
  className: '',
  style: {},
  dataSource: [],
  width: '',
  height: '100%',
  onClick: function onClick() {}
}, _temp);
exports.default = SlideShow;