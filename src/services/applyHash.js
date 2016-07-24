import Promise from 'bluebird';
import crypto from 'crypto';

export default token => {
  if (typeof token !== 'string') {
    return Promise.reject(
      new TypeError(`expected argument of type 'string' but got '${typeof token}'`)
    );
  }

  const shasum = crypto.createHash('sha1');
  shasum.update(token);
  return Promise.resolve(shasum.digest('hex'));
};
