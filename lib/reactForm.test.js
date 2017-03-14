/* eslint-env jest */
import React from 'react';
import reactForm from './reactForm';

const HelloFormFields = () => (
  <div>Hello world!</div>
);

test('The decorator should return a wrapped component', () => {
  // TODO write a better test (please)
  const HelloForm = reactForm()(HelloFormFields);

  expect(HelloForm).toBeDefined();
  expect(HelloForm).not.toBe(HelloFormFields);
});
