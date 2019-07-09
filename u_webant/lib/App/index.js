'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localeProvider = require('antd/lib/locale-provider');

var _localeProvider2 = _interopRequireDefault(_localeProvider);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactIntlUniversal = require('react-intl-universal');

var _reactIntlUniversal2 = _interopRequireDefault(_reactIntlUniversal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util_react_web = require('util_react_web');

var _en_US = require('antd/lib/locale-provider/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _zh_CN = require('antd/lib/locale-provider/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

require('moment/locale/zh-cn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 设置国际化


var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = { initDone: false }, _this.uploadLocaleType = function (changeTo) {
      var LS = _this.props.LS;

      if (LS) {
        LS.setItem('lang_type', changeTo);
      }
    }, _this.getCurrentLocale = function () {
      var getPageQuery = _util_react_web.url.getPageQuery,
          fixLan = _util_react_web.url.fixLan;

      var query = getPageQuery();
      var lan = query.lan;

      var currentLocale = lan;
      var needUpdate = false;
      if (currentLocale) {
        needUpdate = true;
      }
      var LS = _this.props.LS;

      if (LS) {
        currentLocale = currentLocale || LS.getItem('lang_type');
      }
      currentLocale = currentLocale || 'en-US';

      currentLocale = fixLan({ lan: currentLocale });
      if (needUpdate) {
        _this.uploadLocaleType(currentLocale);
      }
      return currentLocale;
    }, _this.getLocale = function () {
      return _this.getCurrentLocale() === 'en-US' ? _en_US2.default : _zh_CN2.default;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadLocales();
    }
  }, {
    key: 'loadLocales',
    value: function loadLocales() {
      var _this2 = this;

      var currentLocale = this.getCurrentLocale();
      var getI18n = this.props.getI18n;

      if (getI18n) {
        getI18n(currentLocale).then(function (res) {
          if (res) {
            _reactIntlUniversal2.default.init({
              currentLocale: currentLocale,
              locales: _defineProperty({}, currentLocale, res.data)
            });
          }
        }).then(function () {
          _this2.setState({ initDone: true });
        });
      } else {
        this.setState({ initDone: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var initDone = this.state.initDone;
      var children = this.props.children;

      return initDone && _react2.default.createElement(
        _localeProvider2.default,
        { locale: this.getLocale() },
        children
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
module.exports = exports['default'];