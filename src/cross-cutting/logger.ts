import pino from 'pino';
import { IConfiguration } from 'cross-cutting/config';

const envToLogLevel = new Map([
  ['dev', 'debug'],
  ['prod', 'info'],
  ['test', 'error'],
  ['stage', 'debug'],
]);

export type ILogger = pino.Logger;

export const makeLogger = (config: IConfiguration): ILogger => {
  const env = config.serverConfig.env || 'dev';
  const level = envToLogLevel.get(env);
  const options: pino.LoggerOptions = { level };
  options.serializers = {
    req(request) {
      return {
        method: request.method,
        url: request.url,
        params: request.params,
        headers: request.headers,
        hostname: request.hostname,
        remoteAddress: request.ip,
        remotePort: request.socket.remotePort,
      };
    },
  };
  if (env !== 'prod') {
    options.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    };
  }
  return pino(options);
};
