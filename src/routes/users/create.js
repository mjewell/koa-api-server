import _ from 'lodash';
import VError from 'verror';
import Promise from 'bluebird';
import moment from 'moment';
import createFailedValidationError from '../../errors/createFailedValidationError';
import generateAcccessToken from '../../services/tokens/generateAccessToken';
import { accessTokenExpiresInDays } from '../../config/security';
import { sequelize, User } from '../../models';

export default async ctx => {
  const params = _.pick(ctx.request.body, [
    'email',
    'password',
    'firstName',
    'lastName',
    'dob',
    'gender',
    'phoneNumber'
  ]);

  let accessToken;

  try {
    await sequelize.transaction(transaction => {
      const userPromise = User.create(params, { transaction });
      return Promise.all([userPromise, generateAcccessToken()])
        .then(([user, token]) => {
          accessToken = token;
          return user.createAccessToken({
            value: accessToken,
            expires: moment().add(accessTokenExpiresInDays, 'days').format()
          }, { transaction });
        });
    });
  } catch (err) {
    const validationError = createFailedValidationError(err);
    if (!validationError) { throw new VError(err); }
    ctx.state.error = validationError;
    return;
  }

  ctx.body = {
    accessToken
  };
};
