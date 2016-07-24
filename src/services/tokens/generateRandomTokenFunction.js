import Promise from 'bluebird';
import base64url from 'base64url';
import crypto from 'crypto';
const promisifiedCrypto = Promise.promisifyAll(crypto);

export default bytes => {
  return () => {
    return promisifiedCrypto.randomBytesAsync(bytes)
      .then(buf => base64url(buf));
  };
};
