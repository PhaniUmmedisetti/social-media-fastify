import { FastifyRequest, FastifyReply } from 'fastify';
import { RESTRequest } from './rest-request';
import { RESTPresenter } from './rest-presenter';

export interface ScrollOptions {
  limit?: number;
  offset?: number;
}

export interface ScrollOptionsRequest {
  Querystring: ScrollOptions;
}

export abstract class ApplicationController extends RESTPresenter {
  constructor() {
    super();
  }

  parseScrollOptions(req: FastifyRequest<ScrollOptionsRequest>): ScrollOptions {
    const options: ScrollOptions = { limit: 100, offset: 0 };
    const query = req.query || {};
    const limit = Number(query.limit);
    const limitIsValid = limit && limit <= 100 && limit > 0;
    const offset = Number(query.offset);
    const offsetIsValid = offset && offset >= 0;
    if (limitIsValid) {
      options.limit = limit;
    }
    if (offsetIsValid) {
      options.offset = offset;
    }
    return options;
  }
}
