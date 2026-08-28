/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-video', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
  };
});

test('renders correctly', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<App />);
  });
  await ReactTestRenderer.act(() => {
    tree?.unmount();
  });
});
