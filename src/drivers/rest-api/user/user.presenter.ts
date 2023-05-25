/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from 'domain/entities/user';
import { RESTResponse } from 'drivers/rest-api/common/rest-response';
import { StatusCodes } from 'http-status-codes';
import { UserPresenter } from 'interfaces/auth/user-presenter';

export class RESTUserPresenter implements UserPresenter<RESTResponse> {
  alreadyExist(): RESTResponse {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  notFound(_msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  databaseError(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  semanticError(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  internalError(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  notModified(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  notAcceptable(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  tooManyRequests(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  gone(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  badRequest(msg?: string | undefined): RESTResponse {
    throw new Error('Method not implemented.');
  }
  [x: string]: any;
  showUsers(users: User[], totalUsers: number): RESTResponse {
    return {
      statusCode: StatusCodes.OK,
      data: {
        users: users.map((data: User) => this.serialize(data)),
        totalUsers: totalUsers,
      },
    };
  }

  // showProfileInfo(userProfile: User): RESTResponse {
  //   return {
  //     statusCode: StatusCodes.OK,
  //     data: this.profileDataSerializer(userProfile),
  //   };
  // }

  created(users: User): RESTResponse {
    return {
      statusCode: StatusCodes.OK,
      data: {
        users: this.serialize(users),
      },
    };
  }

  deleted(userId: number): RESTResponse {
    return {
      statusCode: StatusCodes.OK,
      data: { id: userId },
    };
  }

  updated(id: number): RESTResponse {
    return {
      statusCode: StatusCodes.OK,
      data: {
        id,
      },
    };
  }

  // getAccountToken(): RESTResponse {
  //   return {
  //     statusCode: StatusCodes.OK,
  //   };
  // }
  // private serialize(profile: User): any {
  //   return {
  //     ...this.profileDataSerializer(profile),
  //     access_token: profile.access_token,
  //     expires_in: profile.expires_in,
  //     token_type: profile.token_type,
  //   };
  // }

  // private profileDataSerializer = (userProfile: User): object => {
  //   return {
  //     ...this.profileSerializer(userProfile),
  //     userProfileCourses:
  //       userProfile.userProfileCourses &&
  //       userProfile.userProfileCourses.map((userProfileCourse: any) => {
  //         return {
  //           ...this.userProfileCourseSerializer(userProfileCourse),
  //         };
  //       }),
  //     userAccount: userProfile.userAccount && {
  //       ...this.userAccountSerializer(userProfile.userAccount),
  //     },
  //     roles:
  //       userProfile.roles &&
  //       userProfile.roles.map((role: any) => {
  //         return {
  //           ...this.rolesSerializer(role),
  //         };
  //       }),
  //   };
  // };
}
