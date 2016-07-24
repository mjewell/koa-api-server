import moment from 'moment';
import generateAccessToken from '../services/tokens/generateAccessToken';
import { accessTokenExpiresInDays } from '../config/security';

export default async ctx => {
  const accessToken = await generateAccessToken();

  await ctx.req.user.createAccessToken({
    value: accessToken,
    expires: moment().add(accessTokenExpiresInDays, 'days').format()
  });

  ctx.body = {
    accessToken
  };
};
