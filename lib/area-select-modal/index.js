'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _tag = require('antd/lib/tag');

var _tag2 = _interopRequireDefault(_tag);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

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

var _tabs = require('antd/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _class, _temp, _initialiseProps;

require('antd/lib/row/style');

require('antd/lib/col/style');

require('antd/lib/tag/style');

require('antd/lib/modal/style');

require('antd/lib/tabs/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _cascaderAddressOptions = require('../area-select/cascader-address-options');

var _cascaderAddressOptions2 = _interopRequireDefault(_cascaderAddressOptions);

var _parseCode = require('../parse-code');

var _parseCode2 = _interopRequireDefault(_parseCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabPane = _tabs2.default.TabPane;

var prefixCla = 'bis-area-select-modal';

var heights = {
  sm: '24px',
  md: '32px',
  lg: '40px'
};

var decorationProvinceName = function decorationProvinceName(name) {
  return name.substring(0, name.indexOf('省')) || name.substring(0, name.indexOf('市')) || name.substring(0, 2);
};

var AreaSelectModal = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(AreaSelectModal, _PureComponent);

  function AreaSelectModal(props) {
    (0, _classCallCheck3.default)(this, AreaSelectModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AreaSelectModal.__proto__ || (0, _getPrototypeOf2.default)(AreaSelectModal)).call(this, props));

    _initialiseProps.call(_this);

    var panes = [{ title: _parseCode2.default.getPCA(props.restrict) || '全国',
      content: _this.getContent(props.restrict),
      key: '0'
    }];
    var PCATag = _this.getTag(props.value);
    _this.state = {
      text: !props.value || props.value.length === 0 ? _react2.default.createElement(
        'span',
        { style: { display: 'inline-block', margin: '3px 0 3px 5px' } },
        props.placeholder
      ) : PCATag,
      visible: false,
      checkedArea: PCATag,
      checkedCode: props.value,
      activeKey: '0',
      panes: panes
    };
    return _this;
  }

  (0, _createClass3.default)(AreaSelectModal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var panes = [{ title: _parseCode2.default.getPCA(nextProps.restrict) || '全国',
        content: this.getContent(nextProps.restrict),
        key: '0'
      }];
      var PCATag = this.getTag(nextProps.value);
      this.setState({
        text: !nextProps.value || nextProps.value.length === 0 ? _react2.default.createElement(
          'span',
          { style: { display: 'inline-block', margin: '3px 0 3px 5px' } },
          nextProps.placeholder
        ) : PCATag,
        checkedArea: PCATag,
        checkedCode: nextProps.value,
        panes: panes
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          size = _props.size;
      var _state = this.state,
          text = _state.text,
          checkedArea = _state.checkedArea;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCla, className), style: style },
        _react2.default.createElement(
          'div',
          {
            className: prefixCla + '-selectDiv',
            style: { minHeight: heights[size] },
            onClick: this.handleClick
          },
          _react2.default.createElement(
            'span',
            null,
            text
          )
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u533A\u57DF\u9009\u62E9',
            width: 700,
            bodyStyle: { minHeight: 363 },
            visible: this.state.visible,
            onOk: this.handleOk,
            onCancel: this.handleCancel
          },
          _react2.default.createElement(
            'div',
            { className: prefixCla + '-checked' },
            _react2.default.createElement(
              'label',
              null,
              '\u9009\u4E2D\u533A\u57DF\uFF1A'
            ),
            _react2.default.createElement(
              'span',
              null,
              checkedArea
            )
          ),
          _react2.default.createElement(
            _tabs2.default,
            {
              type: 'card',
              activeKey: this.state.activeKey,
              onTabClick: this.handleTabClick
            },
            this.state.panes.map(function (pane) {
              return _react2.default.createElement(
                TabPane,
                { tab: pane.title, key: pane.key, closable: pane.closable },
                pane.content
              );
            })
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
  restrict: _propTypes2.default.string,
  size: _propTypes2.default.string,
  value: _propTypes2.default.arrayOf(_propTypes2.default.string),
  type: _propTypes2.default.oneOf(['single', 'multiple']),
  toFinal: _propTypes2.default.bool,
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
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getContent = function (restrict) {
    var selfOptions = _this2.props.options;

    if (!restrict) return _this2.provinces();
    if (restrict.length === 2) return _this2.cities(selfOptions || (0, _cascaderAddressOptions.getObj)(restrict));
    if (restrict.length === 4) return _this2.areas(selfOptions || (0, _cascaderAddressOptions.getObj)(restrict));
    return _this2.provinces();
  };

  this.getTag = function (codes) {
    return _react2.default.createElement(
      'div',
      null,
      codes.map(function (code) {
        return _react2.default.createElement(
          _tag2.default,
          {
            closable: true,
            onClose: function onClose(e) {
              return _this2.handleTagClose(e, code);
            },
            style: { marginRight: '4px', marginTop: '3px', borderRadius: '2px', height: '24px' }
          },
          code === '' ? '全国' : _parseCode2.default.getPCA(code)
        );
      })
    );
  };

  this.provinces = function () {
    var selfOptions = _this2.props.options;

    return _react2.default.createElement(
      'div',
      null,
      !_this2.props.toFinal && _react2.default.createElement(
        'span',
        { className: prefixCla + '-supLabel', onClick: _this2.handleNationalClick },
        '\u5168\u56FD'
      ),
      _react2.default.createElement(
        _row2.default,
        { className: prefixCla + '-row' },
        (selfOptions || _cascaderAddressOptions2.default).map(function (item) {
          return _react2.default.createElement(
            _col2.default,
            { span: 4, className: prefixCla + '-col' },
            _react2.default.createElement(
              'span',
              { onClick: function onClick() {
                  return _this2.handleProvinceClick(item);
                } },
              decorationProvinceName(item.label)
            )
          );
        })
      )
    );
  };

  this.cities = function (province) {
    return _react2.default.createElement(
      'div',
      null,
      !_this2.props.toFinal && _react2.default.createElement(
        'span',
        { className: prefixCla + '-supLabel', onClick: function onClick() {
            return _this2.handleSupLabelClick(province);
          } },
        province.label
      ),
      _react2.default.createElement(
        _row2.default,
        { className: prefixCla + '-row' },
        province.children && (0, _cascaderAddressOptions.cityOptions)(province.value).map(function (item) {
          return _react2.default.createElement(
            _col2.default,
            { key: item.value, span: 4, className: prefixCla + '-col' },
            _react2.default.createElement(
              'span',
              { onClick: function onClick() {
                  return _this2.handleCityClick(item);
                } },
              item.label
            )
          );
        })
      )
    );
  };

  this.areas = function (city) {
    return _react2.default.createElement(
      'div',
      null,
      !_this2.props.toFinal && _react2.default.createElement(
        'span',
        { className: prefixCla + '-supLabel', onClick: function onClick() {
            return _this2.handleSupLabelClick(city);
          } },
        city.label
      ),
      _react2.default.createElement(
        _row2.default,
        { className: prefixCla + '-row' },
        city.children && (0, _cascaderAddressOptions.areaOptions)(city.value).map(function (item) {
          return _react2.default.createElement(
            _col2.default,
            { key: item.value, span: 4, className: prefixCla + '-col' },
            _react2.default.createElement(
              'span',
              { onClick: function onClick() {
                  return _this2.handleAreaClick(item);
                } },
              item.label
            )
          );
        })
      )
    );
  };

  this.handleNationalClick = function () {
    var newPanes = _this2.state.panes.slice(0, 1);
    _this2.setState({
      panes: newPanes,
      activeKey: '0',
      checkedArea: _this2.getTag(['']),
      checkedCode: ['']
    });
  };

  this.handleSupLabelClick = function (item) {
    var checkedCode = _this2.state.checkedCode;

    var newCheckedCode = checkedCode.filter(function (code) {
      return code.indexOf(item.value) === -1;
    });
    var newPanes = _this2.state.panes.slice(0, 1);
    _this2.setState({
      panes: newPanes,
      activeKey: '0',
      checkedArea: _this2.getTag([].concat((0, _toConsumableArray3.default)(newCheckedCode), [item.value])),
      checkedCode: [].concat((0, _toConsumableArray3.default)(newCheckedCode), [item.value])
    });
  };

  this.add = function (item) {
    var panes = [].concat((0, _toConsumableArray3.default)(_this2.state.panes));
    var activeKey = _this2.state.panes.length;
    item.value.length === 2 && panes.push({ title: item.label, content: _this2.cities(item), key: '' + activeKey });
    item.value.length === 4 && panes.push({ title: item.label, content: _this2.areas(item), key: '' + activeKey });
    _this2.setState({ panes: panes, activeKey: '' + activeKey });
  };

  this.handleProvinceClick = function (item) {
    var type = _this2.props.type;
    var checkedCode = _this2.state.checkedCode;

    var newCheckedCode = void 0;
    if (type === 'multiple') {
      // newCheckedCode = [...checkedCode, item.value];
      // for (const code of checkedCode) {
      //   if (code.includes(item.value)) newCheckedCode = checkedCode; break;
      // }
      newCheckedCode = checkedCode.map(function (code) {
        if (code.includes(item.value)) return code;
        if (item.value.includes(code)) return item.value;
        return code;
      });
    } else {
      newCheckedCode = [item.value];
    }
    _this2.add(item);
    _this2.setState({
      // checkedArea: this.getTag(newCheckedCode),
      // checkedCode: newCheckedCode,
    });
  };

  this.handleCityClick = function (item) {
    var type = _this2.props.type;
    var checkedCode = _this2.state.checkedCode;

    var newCheckedCode = void 0;
    if (type === 'multiple') {
      // newCheckedCode = [...checkedCode, item.value];
      newCheckedCode = checkedCode.map(function (code) {
        if (code.includes(item.value)) return code;
        if (item.value.includes(code)) return item.value;
        return code;
      });
      // for (const code of checkedCode) {
      //   if (code.includes(item.value) || item.value.includes(code)) newCheckedCode = checkedCode; break;
      // }
      // if (newCheckedCode.length = checkedCode.length) {
      //   newCheckedCode = checkedCode.filter((code) => {
      //     return !item.value.includes(code);
      //   })
      // }
    } else {
      newCheckedCode = [item.value];
    }
    _this2.add(item);
    _this2.setState({
      // checkedArea: this.getTag(newCheckedCode),
      // checkedCode: newCheckedCode,
    });
  };

  this.handleAreaClick = function (item) {
    var type = _this2.props.type;
    var checkedCode = _this2.state.checkedCode;

    var newCheckedCode = void 0;
    if (type === 'multiple') {
      newCheckedCode = [].concat((0, _toConsumableArray3.default)(checkedCode), [item.value]);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(checkedCode), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var code = _step.value;

          if (item.value.includes(code)) {
            newCheckedCode = checkedCode;
            break;
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

      if (newCheckedCode.length === checkedCode.length) {
        newCheckedCode = checkedCode.map(function (code) {
          if (code.includes(item.value)) return code;
          if (item.value.includes(code)) return item.value;
          return code;
        });
      }
    } else {
      newCheckedCode = [item.value];
    }
    var newPanes = _this2.state.panes.slice(0, 1);
    _this2.setState({
      panes: newPanes,
      activeKey: '0',
      checkedArea: _this2.getTag(newCheckedCode),
      checkedCode: newCheckedCode
    });
  };

  this.handleTagClose = function (e, code) {
    e.preventDefault();
    e.stopPropagation();
    var checkedCode = _this2.state.checkedCode;

    var newCheckedCode = checkedCode.filter(function (item) {
      return item !== code;
    });
    _this2.setState({
      checkedArea: _this2.getTag(newCheckedCode),
      checkedCode: newCheckedCode
    });
    _this2.props.onChange(newCheckedCode);
  };

  this.handleClick = function () {
    _this2.setState({
      visible: true
    });
  };

  this.handleOk = function () {
    var checkedCode = _this2.state.checkedCode;
    var onChange = _this2.props.onChange;

    _this2.setState({
      visible: false
    });
    onChange(checkedCode);
  };

  this.handleCancel = function () {
    _this2.setState({
      visible: false
    });
  };

  this.handleTabClick = function (e) {
    var newPanes = _this2.state.panes.slice(0, parseInt(e) + 1);
    _this2.setState({
      panes: newPanes,
      activeKey: e
    });
  };
}, _temp);
exports.default = AreaSelectModal;