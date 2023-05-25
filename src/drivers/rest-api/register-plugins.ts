import cors from '@fastify/cors';
// import compress from '@fastify/compress';
import middie from '@fastify/middie';
import multipart from '@fastify/multipart';
// import fastifySwagger from '@fastify/swagger';
// import fastifySwaggerUi from '@fastify/swagger-ui';
import { Config } from 'cross-cutting';
import { AppServer } from 'drivers/rest-api/server';

// export const swaggerOptions = {
//   swagger: {
//     info: {
//       title:
//         'Greater Than Educations Technology - ID Auth Service - OpenAPI 3.0',
//       description:
//         'This is a sample ID-Auth Service based on the OpenAPI 3.0 specification. You can find out more about Swagger at [https://swagger.io](https://swagger.io).  ',
//       version: '1.0.0',
//     },
//     externalDocs: {
//       url: 'https://swagger.io',
//       description: 'Find more info here',
//     },
//   },
// };
// export const swaggerUIOptions = {
//   routePrefix: '/api_documentation',
// };

export async function registerPlugins(
  server: AppServer,
  config: Config
): Promise<AppServer> {
  let origin: Array<RegExp | string> | string = [];
  if (config.isProd) {
    // origin.push(/\.narayanas\.com$/);
    origin.push(/localhost:*/);
  } else {
    origin = '*';
  }

  server.register(middie);

  server.register(cors, { origin });

  server.register(multipart);

  // await server.register(fastifySwagger, swaggerOptions);

  // await server.register(fastifySwaggerUi, swaggerUIOptions);

  //server.register(compress, { global: true });

  return server;
}
