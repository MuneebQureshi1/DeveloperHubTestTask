/* eslint-env jest */

jest.mock('react-native-reanimated', () => {
  const { View, Text, Image, ScrollView } = require('react-native');

  const createSharedValue = initial => ({ value: initial });

  return {
    __esModule: true,
    default: {
      View,
      Text,
      Image,
      ScrollView,
      createAnimatedComponent: Component => Component,
    },
    useSharedValue: initial => createSharedValue(initial),
    useAnimatedStyle: updater => updater(),
    useDerivedValue: updater => ({ value: updater() }),
    useAnimatedProps: updater => updater(),
    withTiming: (value, _config, callback) => {
      if (callback) {
        callback(true);
      }
      return value;
    },
    withSpring: (value, _config, callback) => {
      if (callback) {
        callback(true);
      }
      return value;
    },
    withSequence: (...values) => values[values.length - 1],
    withDelay: (_delay, value) => value,
    withRepeat: value => value,
    cancelAnimation: () => {},
    runOnJS: fn => fn,
    runOnUI: fn => fn,
    Easing: {
      linear: value => value,
      ease: value => value,
      cubic: value => value,
      quad: value => value,
      in: () => value => value,
      out: () => value => value,
      inOut: () => value => value,
    },
  };
});

jest.mock('react-native-localize', () => ({
  getLocales: () => [{ countryCode: 'US', languageCode: 'en' }],
}));

jest.mock('react-native-keychain', () => {
  const secureStore = new Map();
  return {
    getGenericPassword: jest.fn(async ({ service }) => {
      const password = secureStore.get(service);
      if (password == null) {
        return false;
      }
      return { password, username: service, service, storage: 'mock' };
    }),
    setGenericPassword: jest.fn(async (_username, password, { service }) => {
      secureStore.set(service, password);
      return { service, storage: 'mock' };
    }),
  };
});
