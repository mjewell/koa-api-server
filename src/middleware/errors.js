import _ from 'lodash';

export default async (ctx, next) => {
  await next();
  const error = ctx.state.error;
  if (error) {
    const response = ctx.response;
    response.status = error.statusCode;
    response.message = `${_.startCase(error.body.code)}`;
    response.body = error.context || error.message || response.message;
  }
};
