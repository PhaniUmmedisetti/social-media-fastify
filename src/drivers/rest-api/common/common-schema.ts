import S from 'fluent-json-schema';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class CommonSchema {
  errorSchema = () => {
    const schemaCodes = new Map();
    schemaCodes.set(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
    schemaCodes.set(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
    schemaCodes.set(
      StatusCodes.UNPROCESSABLE_ENTITY,
      ReasonPhrases.UNPROCESSABLE_ENTITY
    );
    schemaCodes.set(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR
    );

    let errSchema = new Map();
    for (const [statusCode] of schemaCodes) {
      errSchema.set(
        statusCode,
        S.object()
          .prop('statusCode', S.number().required())
          .prop('errorMessage', S.string().required())
          .prop('errorReason', S.string())
      );
    }

    errSchema = Object.fromEntries(errSchema);
    return { ...errSchema };
  };

  headerSchema = () => {
    const headerToken = S.object().prop('Authorization', S.string().required());
    return headerToken;
  };

  paramsSchema = () => {
    const paramsJsonSchema = S.object().prop('id', S.number());
    return paramsJsonSchema;
  };
}
