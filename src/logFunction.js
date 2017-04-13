/* eslint-disable no-console */

const logFunction = (f, parseResult = v => v) => (...args) => {
  console.group(f.name);
  console.log('called with', ...args);
  const result = f(...args);
  console.log('it returns', parseResult(result));
  console.groupEnd();

  return result;
};

export default logFunction;
