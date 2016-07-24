import { User } from '../../models';

export default verifyMethodName => {
  return (email, token, done) => {
    return User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false);
        }

        return user[verifyMethodName](token)
          .then(isMatch => done(null, isMatch && user));
      })
      .catch(done);
  };
};
