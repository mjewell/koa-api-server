import Promise from 'bluebird';
import bcryptNode from 'bcrypt-nodejs';
import security from '../../config/security';
const bcrypt = Promise.promisifyAll(bcryptNode);

export default (model, fieldName) => {
  if (!model.changed(fieldName)) {
    return null;
  }

  return bcrypt.genSaltAsync(security.saltRounds)
    .then(salt => bcrypt.hashAsync(model[fieldName], salt, null))
    .then(hash => {
      model[fieldName] = hash;
    });
};
