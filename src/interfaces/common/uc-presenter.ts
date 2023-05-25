export interface UseCasePresenter<ResponseType> {
  alreadyExist(): ResponseType;
  notFound(msg?: string): ResponseType;
  databaseError(msg?: string): ResponseType;
  semanticError(msg?: string): ResponseType;
  internalError(msg?: string): ResponseType;
  notModified(msg?: string): ResponseType;
  notAcceptable(msg?: string): ResponseType;
  tooManyRequests(msg?: string): ResponseType;
  gone(msg?: string): ResponseType;
  badRequest(msg?: string): ResponseType;
}
