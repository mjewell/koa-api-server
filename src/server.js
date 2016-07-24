import app from './app';
import { port } from './config/server';

app.listen(port, () => {
  app.context.logger.info(`server started on port ${port}`);
});
