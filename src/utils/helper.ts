/**
 * Helper function to log to console in development mode
 * @param args - The arguments to log
 */
    

export const devLog = (...args: any[]) => {
    if (__DEV__) {
      console.log(...args);
    }
  };