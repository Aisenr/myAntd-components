'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('antd/lib/modal/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PictureList = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(PictureList, _React$Component);

  function PictureList(props) {
    (0, _classCallCheck3.default)(this, PictureList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PictureList.__proto__ || (0, _getPrototypeOf2.default)(PictureList)).call(this, props));

    _this.onClickImg = function (item) {
      var images = _this.props.images;

      var index = _this.getElementIndex(images, item);
      _this.setState({
        showModal: true,
        nowImg: item,
        previousCla: index <= 0 ? 'hidden' : 'previous',
        nextCla: images.length - 1 === index ? 'hidden' : 'next'
      });
    };

    _this.getElementIndex = function (arr, element) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].url === element.url) return i;
      }
    };

    _this.previous = function () {
      var images = _this.props.images;
      var nowImg = _this.state.nowImg;

      if (!images.find(function (item) {
        return item.url === nowImg.url;
      })) {
        return;
      }
      var index = _this.getElementIndex(images, nowImg);
      var previousImg = images[index - 1 <= 0 ? 0 : index - 1];
      var previousCla = index - 1 <= 0 ? 'hidden' : 'previous';
      _this.setState({
        nowImg: (0, _extends3.default)({}, previousImg),
        previousCla: previousCla,
        nextCla: 'next'
      });
    };

    _this.next = function () {
      var images = _this.props.images;
      var nowImg = _this.state.nowImg;

      var index = _this.getElementIndex(images, nowImg);
      var nextImg = images[index + 1];
      if (index >= images.length - 2) {
        _this.setState({
          nowImg: nextImg,
          nextCla: 'hidden',
          previousCla: 'previous'
        });
      } else {
        _this.setState({
          nowImg: nextImg,
          nextCla: 'next',
          previousCla: 'previous'
        });
      }
    };

    _this.hideModal = function () {
      _this.setState({
        showModal: false,
        nowImg: {}
      });
    };

    _this.state = {
      showModal: false,
      nowImg: {}
    };
    return _this;
  }

  (0, _createClass3.default)(PictureList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-picture-list' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          images = _props.images,
          thumbnailParams = _props.thumbnailParams,
          imageSize = _props.imageSize;
      var _state = this.state,
          showModal = _state.showModal,
          nowImg = _state.nowImg,
          previousCla = _state.previousCla,
          nextCla = _state.nextCla;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        images.map(function (item, index) {
          var key = index;
          return _react2.default.createElement(
            'div',
            { key: item + '-' + key, className: prefixCls + '-img-' + imageSize, onClick: function onClick() {
                _this2.onClickImg(item);
              } },
            _react2.default.createElement('img', { alt: '', src: item.url + '?' + thumbnailParams })
          );
        }),
        _react2.default.createElement(
          _modal2.default,
          {
            width: '1080px',
            wrapClassName: prefixCls + '-vertical-center-modal',
            visible: showModal,
            onCancel: this.hideModal,
            footer: null,
            bodyStyle: { textAlign: 'center', height: '80vh' },
            destroyOnClose: true
          },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-enlarge' },
            _react2.default.createElement('div', { className: prefixCls + '-' + previousCla, onClick: function onClick() {
                return _this2.previous();
              } }),
            _react2.default.createElement('img', { alt: '', src: nowImg.url, style: { maxWidth: '1000px', maxHeight: '100%' } }),
            _react2.default.createElement('div', { className: prefixCls + '-' + nextCla, onClick: function onClick() {
                return _this2.next();
              } })
          )
        )
      );
    }
  }]);
  return PictureList;
}(_react2.default.Component), _class.propTypes = {
  images: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    url: _propTypes2.default.string,
    suffix: _propTypes2.default.string,
    size: _propTypes2.default.number,
    description: _propTypes2.default.string,
    thumbnailParams: _propTypes2.default.string
  })),
  imageSize: _propTypes2.default.oneOf(['sm', 'md', 'lg'])
}, _class.defaultProps = {
  images: [],
  thumbnailParams: 'x-oss-process=image/resize,w_200',
  imageSize: 'lg'
}, _temp);
exports.default = PictureList;