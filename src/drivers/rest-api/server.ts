import { Server, IncomingMessage, ServerResponse } from 'http';
import { createOrmConfig } from 'infra/postgres/create-ormconfig';
import { Config, makeLogger, ILogger } from 'cross-cutting';
import { createDIContainer } from './create-dicontainer';
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { DataSource } from 'typeorm';
import { registerRoutes } from './register-routes';

export type Request = IncomingMessage;
export type Response = ServerResponse;
export type AppServer = FastifyInstance<Server, Request, Response>;

async function internalErrorHandler(
  error: Error,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const res: any = {
    statusCode: 500,
    errorMessage: 'Internal Server Error',
  };

  if (error.message) {
    res.errorReason = error.message;
  }
  req.log.error(error.message);
  reply.status(500);
  reply.send(res);
}

export async function createServer(config: Config, appLogger: ILogger) {
  const logger = config.serverConfig.env === 'prod' ? false : appLogger;
  const server: AppServer = fastify({ logger, ignoreTrailingSlash: true });

  const pgConnection = new DataSource(createOrmConfig(config));
  await pgConnection.initialize();

  createDIContainer(config, pgConnection);
  server.setErrorHandler(internalErrorHandler);
  await registerRoutes(server, config);
  server.get('/healthcheck', (req, reply) => {
    reply.status(200).send('ok');
  });
  return server;
}

export async function startServer(server: AppServer) {
  await server.ready();
  await server.listen({ port: 3000, host: '0.0.0.0' });
}

const start = async () => {
  const config = new Config();
  const logger = makeLogger(config);
  createServer(config, logger)
    .then((server) => {
      startServer(server);
    })
    .catch((e) => {
      console.log('failed', e);
    });
};

if (require.main === module) {
  start();
}
