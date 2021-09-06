import dotenv from 'dotenv';
import debug from 'debug';

const log: debug.IDebugger = debug('config:environment');

const load = () => {
  if (dotenv.config().error) {
    const dotenvResult = dotenv.config({ path: '.env' });
    if (dotenvResult.error) {
      log('Error', 'Environment variables are not loaded !');
      throw dotenvResult.error;
    }
  }
  log('Environment variables are loaded');
  return true;
};

export default load();
