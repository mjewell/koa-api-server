import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import cors from 'koa-cors';
import timeLogger from './middleware/timeLogger';
import requestResponseLogger from './middleware/requestResponseLogger';
import errorHandler from './middleware/errors';
import passport from './auth/passport';
import generateRouter from './routes/generateRouter';
import log from './log';

const app = new Koa();
const appLogger = log.child({ component: 'server' });
app.context.logger = appLogger;

app.use(koaBodyparser());
app.use(cors());
app.use(timeLogger(appLogger));
app.use(requestResponseLogger(appLogger));
app.use(errorHandler);

app.use(passport.initialize());

const router = generateRouter(passport);
app.use(router.routes(), router.allowedMethods());

app.on('error', (err, ctx) => {
  appLogger.error({
    err,
    ctx
  }, 'Uncaught Error');
});

export default app;
