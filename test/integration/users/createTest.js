import { describe, it } from 'mocha';
import server from '../setup';

describe('users', () => {
  describe('create', () => {
    describe('400: Bad Request', () => {
      it('with no fields', () => {
        return server
          .post('/users')
          .send({})
          .expect(400, {
            email: ['cannot be null'],
            password: ['cannot be null']
          });
      });

      it('with empty fields', () => {
        return server
          .post('/users')
          .send({
            email: '',
            password: ''
          })
          .expect(400, {
            email: [
              'cannot be blank',
              'is not a valid email'
            ],
            password: [
              'cannot be blank',
              'must be at least 8 characters'
            ]
          });
      });

      it('with an invalid email', () => {
        return server
          .post('/users')
          .send({
            email: 'abcom'
          })
          .expect(400, {
            email: ['is not a valid email'],
            password: ['cannot be null']
          });
      });

      it('with a password shorter than 8 characters', () => {
        return server
          .post('/users')
          .send({
            email: 'a@b.com',
            password: 'asdf'
          })
          .expect(400, {
            password: ['must be at least 8 characters']
          });
      });

      it('with a non unique email', () => {
        return server
          .post('/users')
          .send({
            email: 'a@b.com',
            password: 'asdfasdf'
          })
          .expect(200)
          .then(() => {
            return server
              .post('/users')
              .send({
                email: 'a@b.com',
                password: 'asdfasdf'
              })
              .expect(400, {
                email: ['must be unique']
              });
          });
      });
    });

    describe('200: OK', () => {
      it('with valid params', () => {
        return server
          .post('/users')
          .send({
            email: 'a@b.com',
            password: 'asdfasdf'
          })
          .expect(200)
          .expect(res => {
            if (!res.body.accessToken) {
              throw new Error('expected accessToken to be set');
            }
          });
      });
    });
  });
});
