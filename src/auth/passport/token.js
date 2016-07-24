import generateVerifyFunction from '../../services/auth/generateVerifyFunction';

export const options = {
  usernameHeader: 'x-email',
  tokenHeader: 'x-access-token',
  usernameField: 'email',
  tokenField: 'access-token'
};

export const verify = generateVerifyFunction('verifyAccessToken');

export default {
  options,
  verify
};
