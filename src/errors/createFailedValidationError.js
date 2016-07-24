import errors from 'restify-errors';
import { ValidationError } from 'sequelize/lib/errors';

errors.makeConstructor('FailedValidationError', {
  statusCode: 400
});

export default (err) => {
  if (err instanceof ValidationError) {
    const context = err.errors.reduce((hash, error) => {
      const path = error.path;
      let message = error.message;
      hash[path] = hash[path] || [];
      if (message.startsWith(`${path} `)) {
        message = message.substring(path.length + 1);
      }
      hash[path].push(message);
      return hash;
    }, {});

    return new errors.FailedValidationError({ context });
  }

  return undefined;
};
