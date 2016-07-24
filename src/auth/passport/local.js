import generateVerifyFunction from '../../services/auth/generateVerifyFunction';

export const options = {
  usernameField: 'email',
  session: false
};

export const verify = generateVerifyFunction('verifyPassword');

export default {
  options,
  verify
};
