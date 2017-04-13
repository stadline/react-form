'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-console */

var logFunction = function logFunction(f) {
  var parseResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v) {
    return v;
  };
  return function () {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    console.group(f.name);
    (_console = console).log.apply(_console, ['called with'].concat(args));
    var result = f.apply(undefined, args);
    console.log('it returns', parseResult(result));
    console.groupEnd();

    return result;
  };
};

exports.default = logFunction;