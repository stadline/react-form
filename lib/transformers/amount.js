'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _transformIntegerToDecimal = function _transformIntegerToDecimal(integerValue) {
  return (Math.round(integerValue) / 100).toFixed(2);
};

var _transformDecimalToInteger = function _transformDecimalToInteger(decimalValue) {
  return Math.round(decimalValue * 100);
};

// react-form transform helper
var transform = exports.transform = function transform(integerValue, prevDecimalValue) {
  var prevIntegerValue = _transformDecimalToInteger(prevDecimalValue);

  if (integerValue === prevIntegerValue) {
    // re-use previous value
    return prevDecimalValue;
  } else if (isNaN(parseInt(integerValue, 10))) {
    // invalid value detected
    return '';
  } else {
    // compute a new value
    return _transformIntegerToDecimal(integerValue);
  }
};

// react-form reverseTransform helper
var reverseTransform = exports.reverseTransform = function reverseTransform(decimalValue) {
  return _transformDecimalToInteger(decimalValue);
};