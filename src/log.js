import bunyan from 'bunyan';
import { name as appName } from './config/app';
import { env } from './config/server';

function selectStreams() {
  const streams = [
    {
      level: 'debug',
      path: `logs/${env}-debug.log`
    }
  ];

  if (env === 'development') {
    streams.push(
      {
        level: 'info',
        stream: process.stdout
      }
    );
  }

  return streams;
}

export const log = bunyan.createLogger({
  name: appName,
  serializers: bunyan.stdSerializers,
  streams: selectStreams()
});

export default log;
