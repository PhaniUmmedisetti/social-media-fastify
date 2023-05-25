import { FastifyInstance } from 'fastify';
import { createServer } from 'drivers/rest-api/server';
import { Config, makeLogger } from 'cross-cutting';

export const testServer = async () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    const config = new Config();
    const logger = makeLogger(config);
    app = await createServer(config, logger);
    await app.ready();
    await app.listen({ port: config.serverConfig.port, host: '0.0.0.0' });
  });
  afterAll(async () => {
    await app.close();
  });
  return () => app;
};
