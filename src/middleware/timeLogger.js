export default logger => {
  return async (ctx, next) => {
    const start = new Date;
    await next();
    const ms = new Date - start;
    logger.info({
      method: ctx.method,
      url: ctx.url,
      duration: `${ms}ms`
    });
  };
};
