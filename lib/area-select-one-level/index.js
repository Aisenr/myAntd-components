'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

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

require('antd/lib/popover/style');

require('antd/lib/icon/style');

require('antd/lib/row/style');

require('antd/lib/col/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _regionParse = require('./regionParse');

var _regionParse2 = _interopRequireDefault(_regionParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixCla = 'bis-area-select-one-level';

var heights = {
  sm: '24px',
  md: '32px',
  lg: '40px'
};

var AreaSelectModal = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(AreaSelectModal, _PureComponent);

  function AreaSelectModal(props) {
    (0, _classCallCheck3.default)(this, AreaSelectModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AreaSelectModal.__proto__ || (0, _getPrototypeOf2.default)(AreaSelectModal)).call(this, props));

    _this.handleClick = function () {
      var visible = _this.state.visible;

      _this.setState({
        visible: !visible,
        downShow: visible,
        upShow: !visible
      });
    };

    _this.handleCityClick = function (item) {
      var onChange = _this.props.onChange;

      _this.setState({
        chooseContent: item.label,
        visible: false,
        downShow: true,
        upShow: false
      });
      onChange([item.value]);
    };

    _this.items = function () {
      var regionRestrict = _this.props.regionRestrict;

      var newOptions = (0, _regionParse2.default)(regionRestrict);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _row2.default,
          { className: prefixCla + '-row' },
          newOptions.map(function (item) {
            return _react2.default.createElement(
              _col2.default,
              { key: item.value, span: 4, className: prefixCla + '-col' },
              _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                    return _this.handleCityClick(item);
                  } },
                item.label
              )
            );
          })
        )
      );
    };

    _this.handleVisibleChange = function (visible) {
      _this.setState({
        visible: visible,
        downShow: !visible,
        upShow: visible
      });
    };

    _this.handleCloseClick = function (e) {
      _this.setState({
        chooseContent: ''
      });
      var onChange = _this.props.onChange;

      onChange([]);
      e.stopPropagation();
    };

    _this.handleDownClick = function () {
      var visible = _this.state.visible;

      _this.setState({
        upShow: !visible,
        downShow: visible
      });
    };

    _this.handleUpClick = function () {
      var visible = _this.state.visible;

      _this.setState({
        upShow: !visible,
        downShow: visible
      });
    };

    _this.handleMouseOver = function () {
      var chooseContent = _this.state.chooseContent;

      _this.setState({
        closeShow: chooseContent,
        downShow: !chooseContent
      });
    };

    _this.handleMouseOut = function () {
      _this.setState({
        closeShow: false,
        downShow: true
      });
    };

    _this.state = {
      visible: false,
      downShow: true,
      upShow: false,
      closeShow: false
    };
    return _this;
  }

  (0, _createClass3.default)(AreaSelectModal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          size = _props.size,
          placeholder = _props.placeholder;
      var _state = this.state,
          visible = _state.visible,
          chooseContent = _state.chooseContent,
          downShow = _state.downShow,
          upShow = _state.upShow,
          closeShow = _state.closeShow;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCla, className), style: style },
        _react2.default.createElement(
          _popover2.default,
          {
            placement: 'bottomLeft',
            overlayStyle: { width: '640px' },
            content: this.items(),
            trigger: 'click',
            visible: visible,
            onVisibleChange: this.handleVisibleChange
          },
          _react2.default.createElement(
            'div',
            {
              className: prefixCla + '-selectDiv',
              style: { minHeight: heights[size], lineHeight: heights[size] },
              onClick: this.handleClick
            },
            chooseContent ? _react2.default.createElement(
              'span',
              { className: prefixCla + '-selectDiv-chooseContent' },
              chooseContent
            ) : placeholder,
            downShow && _react2.default.createElement(_icon2.default, { type: 'down', className: prefixCla + '-selectDiv-down', onClick: this.handleDownClick, onMouseOver: this.handleMouseOver }),
            upShow && _react2.default.createElement(_icon2.default, { type: 'up', className: prefixCla + '-selectDiv-up', onClick: this.handleUpClick }),
            closeShow && _react2.default.createElement(_icon2.default, { type: 'close-circle', className: prefixCla + '-selectDiv-close', onClick: this.handleCloseClick, onMouseOut: this.handleMouseOut })
          )
        )
      );
    }
  }]);
  return AreaSelectModal;
}(_react.PureComponent), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  placeholder: _propTypes2.default.string,
  size: _propTypes2.default.string,
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  className: '',
  style: {},
  placeholder: '点击选择区域',
  restrict: null,
  size: 'md',
  value: [],
  type: 'single',
  toFinal: false,
  onChange: function onChange() {}
}, _temp);
exports.default = AreaSelectModal;