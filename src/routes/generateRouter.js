import koaRouter from 'koa-router';
import usersCreate from './users/create';
import signin from './signin';
import me from './me';

export default (passport) => {
  function localAuth() {
    return passport.authenticate('local', { session: false });
  }

  function tokenAuth() {
    return passport.authenticate('token', { session: false });
  }

  const router = koaRouter();

  // NO AUTH
  router.post('/users', usersCreate);

  // LOCAL AUTH
  router.post('/signin', localAuth(), signin);

  // TOKEN AUTH
  router.get('/me', tokenAuth(), me);

  return router;
};
