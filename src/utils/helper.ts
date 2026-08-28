/**
 * Helper function to log to console in development mode
 * @param args - The arguments to log
 */

import { getGenericPassword, setGenericPassword } from 'react-native-keychain';

export const devLog = (...args: unknown[]) => {
  if (__DEV__) {
    console.log(...args);
  }
};

export async function getFromSecureStorage(
  key: string,
): Promise<string | null> {
  try {
    const credentials = await getGenericPassword({ service: key });
    if (!credentials) {
      return null;
    }
    return credentials.password;
  } catch {
    return null;
  }
}

export async function saveToSecureStorage(
  key: string,
  value: string,
): Promise<void> {
  await setGenericPassword(key, value, { service: key });
}
