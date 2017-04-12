'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var identity = function identity(value) {
  return value;
};

var reactForm = function reactForm() {
  var transform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : identity;
  var reverseTransform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

  return function (ChildComponent) {
    var _class, _temp2;

    return _temp2 = _class = function (_Component) {
      _inherits(FormComponent, _Component);

      function FormComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FormComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormComponent.__proto__ || Object.getPrototypeOf(FormComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          reverseTransform: {}
        }, _this.handleFormChange = function (formValue) {
          var _this$props = _this.props,
              value = _this$props.value,
              onChange = _this$props.onChange;

          var modelValue = reverseTransform(formValue, value);

          // save reverse transform value
          // it will be used to keep user value on transform
          _this.setState({
            reverseTransform: { source: formValue, result: modelValue }
          });

          // send value
          onChange(modelValue);
        }, _this.handleFieldChange = function (fieldName) {
          return function (fieldValue) {
            var value = _this.props.value;

            var formValue = _this.getTransformValue(value);

            _this.handleFormChange(_extends({}, formValue, _defineProperty({}, fieldName, fieldValue)));
          };
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(FormComponent, [{
        key: 'render',
        value: function render() {
          var _props = this.props,
              value = _props.value,
              onChange = _props.onChange,
              rest = _objectWithoutProperties(_props, ['value', 'onChange']);

          return _react2.default.createElement(ChildComponent, _extends({
            value: this.getTransformValue(value),
            formValue: this.getTransformValue(value),
            onChange: this.handleFormChange,
            onFormChange: this.handleFormChange,
            onFieldChange: this.handleFieldChange,
            modelValue: value,
            onModelChange: onChange
          }, rest));
        }

        /**
         * Return previous reverseTransform result
         * if given modelValue is the same as reverseTransform source
         *
         * Return transformed value otherwise
         */

      }, {
        key: 'getTransformValue',
        value: function getTransformValue(modelValue) {
          return transform(modelValue, this.state.reverseTransform.source);
        }
      }]);

      return FormComponent;
    }(_react.Component), _class.propTypes = {
      value: _propTypes2.default.any.isRequired,
      onChange: _propTypes2.default.func.isRequired
    }, _temp2;
  };
};

exports.default = reactForm;