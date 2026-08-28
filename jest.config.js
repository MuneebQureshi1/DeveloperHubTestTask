const rnPreset = require('@react-native/jest-preset');

module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: [
    ...rnPreset.setupFiles,
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-localize|react-native-keychain|@react-navigation|i18next|react-i18next)/)',
  ],
};
