/* eslint-env jest */

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
