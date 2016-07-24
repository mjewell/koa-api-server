import { describe, it, beforeEach } from 'mocha';
import server from './setup';
import { email, password, createTestUser } from './authentication';

describe('signin', () => {
  beforeEach(() => createTestUser());

  describe('400: Bad Request', () => {
    it('with no body', () => {
      return server
          .post('/signin')
          .expect(400);
    });
  });

  describe('401: Unauthorized', () => {
    it('with invalid credentials', () => {
      return server
        .post('/signin')
        .send({
          email: 'a',
          password: 'b'
        })
        .expect(401);
    });

    it('with an incorrect password', () => {
      return server
        .post('/signin')
        .send({
          email,
          password: 'wrong password'
        })
        .expect(401);
    });

    it('with an incorrect email', () => {
      return server
        .post('/signin')
        .send({
          email: 'wrong@email.com',
          password
        })
        .expect(401);
    });
  });

  describe('200: OK', () => {
    it('with valid credentials', () => {
      return server
        .post('/signin')
        .send({ email, password })
        .expect(200)
        .expect(res => {
          if (!res.body.accessToken) {
            throw new Error('expected accessToken to be set');
          }
        });
    });
  });
});
