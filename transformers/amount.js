const _transformIntegerToDecimal = (integerValue) => {
  return (Math.round(integerValue) / 100).toFixed(2);
};

const _transformDecimalToInteger = (decimalValue) => {
  return Math.round(decimalValue * 100);
};

// react-form transform helper
export const transform = (integerValue, prevDecimalValue) => {
  const prevIntegerValue = _transformDecimalToInteger(prevDecimalValue);

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
export const reverseTransform = (decimalValue) => {
  return _transformDecimalToInteger(decimalValue);
};
