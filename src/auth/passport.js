import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { options as localOptions, verify as localVerify } from './passport/local';
import { Strategy as TokenStrategy } from 'passport-token';
import { options as tokenOptions, verify as tokenVerify } from './passport/token';

passport.use(new LocalStrategy(localOptions, localVerify));
passport.use(new TokenStrategy(tokenOptions, tokenVerify));

export default passport;
