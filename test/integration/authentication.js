import { User } from '../../src/models';

export const email = 'test@test.com';
export const password = 'password';

export function createTestUser() {
  return User.create({ email, password });
}

export function loginUser(server) {
  let accessToken;

  return server
    .post('/signin')
    .send({ email, password })
    .expect(res => {
      accessToken = res.body.accessToken;
    }).then(() => {
      return { email, accessToken };
    });
}

export function setAuthHeaders(server, xEmail, xAccessToken) {
  return server
    .set('x-email', xEmail)
    .set('x-access-token', xAccessToken);
}
