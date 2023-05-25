import S from 'fluent-json-schema';
import { CommonSchema } from '../common-schema';

export class UserSchema extends CommonSchema {
  requestUserAccountSchema = () => {
    const bodyRequestSchema = S.object()
      .prop('id', S.number())
      .prop('name', S.string().required())
      .prop('countryCode', S.string().required());

    const response200Schema = S.object()
      .prop('statusCode', S.number())
      .prop(
        'data',
        S.object()
          .prop('id', S.number())
          .prop('name', S.string().required())
          .prop('countryCode', S.string().required())
      );

    return {
      tags: ['Auth -> Users'],
      summary: 'Requesting the user',
      description: 'Getting the User with the matching ID',
      body: bodyRequestSchema,
      response: { 200: response200Schema, ...this.errorSchema() },
    };
  };

  // validateUserAccountSchema = () => {
  //   const bodyValidateSchema = S.object()
  //     .prop('mobile', S.string().required())
  //     .prop('code', S.number().required());

  //   const response200Schema = S.object()
  //     .prop('statusCode', S.number())
  //     .prop(
  //       'data',
  //       S.object()
  //         .prop('access_token', S.string())
  //         .prop('expires_in', S.number())
  //         .prop('token_type', S.string())
  //     );

  //   return {
  //     tags: ['Auth -> User Accounts'],
  //     summary: 'Validating the OTP',
  //     description: 'Putting new profile info in the ID',
  //     body: bodyValidateSchema,
  //     response: { 200: response200Schema, ...this.errorSchema() },
  //   };
  // };
}
