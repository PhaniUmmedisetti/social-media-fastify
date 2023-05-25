export interface RESTRequest {
  Querystring: object;
  Body: object;
  Params: object;
  Headers: object;
}

declare module 'fastify' {
  interface FastifyRequest {
    jwtInfo: object;
  }
}
