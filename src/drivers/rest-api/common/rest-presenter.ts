import { RESTResponse } from './rest-response';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class RESTPresenter {
  protected mapToObject(map: Map<string, any>) {
    const result: { [inx: string]: any } = {};
    for (const [key, value] of map.entries()) {
      result[`${key}`] = value;
    }
    return result;
  }

  alreadyExist(msg?: string): RESTResponse {
    const res = {
      // statusCode: 409
      statusCode: StatusCodes.CONFLICT,
      errorMessage: ReasonPhrases.CONFLICT,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  notFound(msg?: string): RESTResponse {
    const res = {
      // statusCode: 404
      statusCode: StatusCodes.NOT_FOUND,
      errorMessage: ReasonPhrases.NOT_FOUND,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  semanticError(msg?: string): RESTResponse {
    const res = {
      // statusCode: 422
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage: ReasonPhrases.UNPROCESSABLE_ENTITY,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  internalError(msg?: string): RESTResponse {
    const res = {
      // statusCode: 500
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  databaseError(msg?: string): RESTResponse {
    const res = {
      // statusCode: 422
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage: ReasonPhrases.UNPROCESSABLE_ENTITY,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }
  notModified(msg?: string): RESTResponse {
    const res = {
      // statusCode: 304
      statusCode: StatusCodes.NOT_MODIFIED,
      errorMessage: ReasonPhrases.NOT_MODIFIED,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  notAcceptable(msg?: string): RESTResponse {
    const res = {
      // statusCode: 406
      statusCode: StatusCodes.NOT_ACCEPTABLE,
      errorMessage: ReasonPhrases.NOT_ACCEPTABLE,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  tooManyRequests(msg?: string): RESTResponse {
    const res = {
      // statusCode: 429
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
      errorMessage: ReasonPhrases.TOO_MANY_REQUESTS,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  gone(msg?: string): RESTResponse {
    const res = {
      // statusCode: 410
      statusCode: StatusCodes.GONE,
      errorMessage: ReasonPhrases.GONE,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  badRequest(msg?: string): RESTResponse {
    const res = {
      // statusCode: 400
      statusCode: StatusCodes.BAD_REQUEST,
      errorMessage: ReasonPhrases.BAD_REQUEST,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  sendUnauthorize(msg?: string) {
    const res = {
      statusCode: StatusCodes.UNAUTHORIZED,
      errorMessage: ReasonPhrases.UNAUTHORIZED,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }

  sendForbidden(msg?: string) {
    const res = {
      statusCode: StatusCodes.FORBIDDEN,
      errorMessage: ReasonPhrases.FORBIDDEN,
    };
    if (msg) {
      return { ...res, errorReason: msg };
    }
    return res;
  }
}
