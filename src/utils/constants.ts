export const customErrorMessages = {
  notFound: 1000,
  datebaseError: 1001,
  unAuthencitcated: 1002,
  unAuthorized: 1003,
  internalError: 1004,
  notModified: 1005,
  notAcceptable: 1006,
  tooManyRequests: 1007,
  gone: 1008,
  badRequest: 1009,
};

export const errorMessage = {
  invalidOTP: 'Invalid OTP',
  expiredOTP: 'OTP Expired',
  deactivedError: 'Error Deactivating',
};

export const customErrorMessage = (code: number, options: any = {}) => {
  const errorMessages: any = {
    1000: 'record not found',
    1001: 'internal database error',
    1002: 'unAuthenticated user',
    1003: 'unAuthorized user',
    1004: 'internal server error',
    1005: 'data is not modified',
    1006: 'request is not acceptable',
    1007: `Too many attempts. Please wait ${options.ttl} seconds`,
    1008: `${options.msg}`,
    1009: `request is not valid because ${options.reason}`,
  };
  return errorMessages[code];
};

export const webAccountJwtApis = [
  {
    method: 'GET',
    url: '/account/profiles',
  },
  {
    method: 'POST',
    url: '/account/profiles',
  },
];

export const webUnAuthApis = [
  {
    method: 'POST',
    url: '/authentication/request-otp',
  },
  {
    method: 'POST',
    url: '/authentication/validate-otp',
  },
];

export const cmsUnAuthApis = [
  {
    method: 'POST',
    url: '/auth/login',
  },
];

export interface identifierType {
  url: string;
  method: string;
}

export const isMatchAPI = (
  arr: identifierType[],
  identifier: identifierType,
  apiPrefix: string
) => {
  const identifierUrl = identifier.url.replace(`/${apiPrefix}`, '');
  return !arr.every((obj: identifierType) => {
    if (obj.method === identifier.method && obj.url === identifierUrl) {
      return false;
    }
    return true;
  });
};
