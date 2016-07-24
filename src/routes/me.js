export default async ctx => {
  ctx.body = ctx.req.user;
};
