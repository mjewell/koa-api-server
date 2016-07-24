import _ from 'lodash';

export default logger => {
  return async (ctx, next) => {
    logger.info({
      request: ctx.request
    });
    await next();
    logger.info({
      response: _.omit(ctx.response, 'body')
    });
  };
};
