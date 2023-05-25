import { FastifyRequest, FastifyReply } from 'fastify';
import { Container } from 'typedi';
import { RESTRequest } from 'drivers/rest-api/common/rest-request';
import { GetUsers } from 'use-cases/user/get-user.uc';
import { RESTResponse } from '../common/rest-response';
import { ApplicationController } from '../common/application.controller';
import { getUserDIToken } from './user.register';
import { GetUserRequest } from 'interfaces/auth/user-request';

// import { GetUserProfileInfo } from 'use-cases/auth/v1/user-profile/get-user-profile-info.uc';
// import { GetAccountToken } from 'use-cases/auth/v1/user-profile/get-account-profile-token.uc';
// import { UpdateUserProfile } from 'use-cases/auth/v1/user-profile/update-user-profile.uc';

export class UserController extends ApplicationController {
  private getUsers: GetUsers<RESTResponse>;
  // private createUserProfile: CreateUserProfile<RESTResponse>;
  // private getUserProfileInfo: GetUserProfileInfo<RESTResponse>;
  // private updateUserProfile: UpdateUserProfile<RESTResponse>;
  // private getAccountToken: GetAccountToken<RESTResponse>;

  constructor() {
    super();
    this.getUsers = Container.get<GetUsers<RESTResponse>>(getUserDIToken);
    // this.createUserProfile = Container.get<CreateUserProfile<RESTResponse>>(
    //   createUserProfileDIToken
    // );
    // this.getUserProfileInfo = Container.get<GetUserProfileInfo<RESTResponse>>(
    //   getUserProfileInfoDIToken
    // );
    // this.updateUserProfile = Container.get<UpdateUserProfile<RESTResponse>>(
    //   updateUserProfileDIToken
    // );

    // this.getAccountToken =
    //   Container.get<GetAccountToken<RESTResponse>>(getAccountDIToken);
  }

  getAllUsersHandler = async (
    req: FastifyRequest<RESTRequest>,
    reply: FastifyReply
  ): Promise<void> => {
    const parsedReq = this.parseGetUserRequest(req);
    if (!parsedReq) {
      const res = this.badRequest();
      return reply.code(res.statusCode).send(res);
    }
    const res = await this.getUsers.execute(parsedReq);
    return reply.code(res.statusCode).send(res);
  };

  // createUserProfileHandler = async (
  //   req: FastifyRequest<RESTRequest>,
  //   reply: FastifyReply
  // ): Promise<void> => {
  //   const parsedReq = this.parseCreateUserProfileRequest(req);
  //   if (!parsedReq) {
  //     const res = this.badRequest();
  //     return reply.code(res.statusCode).send(res);
  //   }

  //   const res = await this.createUserProfile.execute(parsedReq);
  //   return reply.code(res.statusCode).send(res);
  // };

  // getUserProfileInfoHandler = async (
  //   req: FastifyRequest<RESTRequest>,
  //   reply: FastifyReply
  // ): Promise<void> => {
  //   const parsedReq = this.parseGetUserProfileInfoRequest(req);

  //   if (!parsedReq) {
  //     const res = this.badRequest();
  //     return reply.code(res.statusCode).send(res);
  //   }
  //   const res = await this.getUserProfileInfo.execute(parsedReq);
  //   return reply.code(res.statusCode).send(res);
  // };

  // updateUserProfileHandler = async (
  //   req: FastifyRequest<RESTRequest>,
  //   reply: FastifyReply
  // ): Promise<void> => {
  //   const parsedReq = this.parseUpdateUserProfileRequest(req);
  //   if (!parsedReq) {
  //     const res = this.badRequest();
  //     return reply.code(res.statusCode).send(res);
  //   }

  //   const res = await this.updateUserProfile.execute(parsedReq);
  //   return reply.code(res.statusCode).send(res);
  // };

  // getAccountTokenHandler = async (
  //   req: FastifyRequest<RESTRequest>,
  //   reply: FastifyReply
  // ): Promise<void> => {
  //   const parsedReq = this.parseGetAccountTokenRequest(req);
  //   if (!parsedReq) {
  //     const res = this.badRequest();
  //     return reply.code(res.statusCode).send(res);
  //   }

  //   const res = await this.getAccountToken.execute(parsedReq);
  //   return reply.code(res.statusCode).send(res);
  // };
  private parseGetUserRequest(
    req: FastifyRequest<RESTRequest>
  ): GetUserRequest | null {
    return {
      ...(req.query as object),
      ...(req.params as object),
      // ...(req.jwtInfo as object),
    } as GetUserRequest;
  }

  // private parseCreateUserProfileRequest(
  //   req: FastifyRequest<RESTRequest>
  // ): CreateUserProfileRequest | null {
  //   return {
  //     ...(req.query as object),
  //     ...(req.params as object),
  //     ...(req.body as object),
  //     ...(req.jwtInfo as object),
  //   } as CreateUserProfileRequest;
  // }

  // private parseGetUserProfileInfoRequest(
  //   req: FastifyRequest<RESTRequest>
  // ): GetProfileInfoRequest | null {
  //   return {
  //     ...(req.jwtInfo as object),
  //   } as GetProfileInfoRequest;
  // }

  // private parseUpdateUserProfileRequest(
  //   req: FastifyRequest<RESTRequest>
  // ): UpdateUserProfileRequest | null {
  //   return {
  //     ...(req.params as object),
  //     ...(req.body as object),
  //     ...(req.jwtInfo as object),
  //   } as UpdateUserProfileRequest;
  // }

  // private parseGetAccountTokenRequest(
  //   req: FastifyRequest<RESTRequest>
  // ): GetAccountTokenRequest | null {
  //   return {
  //     ...(req.params as object),
  //     ...(req.jwtInfo as object),
  //   } as GetAccountTokenRequest;
  // }
}
