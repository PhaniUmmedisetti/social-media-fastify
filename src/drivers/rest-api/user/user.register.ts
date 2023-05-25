import { Container, Token } from 'typedi';
import { DataSource } from 'typeorm';
import { makeLogger, Config } from 'cross-cutting';
import { GetUsers } from 'use-cases/user/get-user.uc';
import { RESTUserPresenter } from './user.presenter';
import { UserRepository } from 'infra/postgres/user/user.repository';
// import { CreateUserProfile } from 'use-cases/auth/v1/user-profile/create-user-profile.uc';
// import { UserAccountsRepository } from 'infra/postgres/user-accounts/user-accounts.repository';
// import { GetUserProfileInfo } from 'use-cases/auth/v1/user-profile/get-user-profile-info.uc';
// import { UserProfileCoursesRepository } from 'infra/postgres/user-profile-courses/user-profile-course.repository';
// import { UpdateUserProfile } from 'use-cases/auth/v1/user-profile/update-user-profile.uc';
// import { GetAccountToken } from 'use-cases/auth/v1/user-profile/get-account-profile-token.uc';

// export const createUserProfileDIToken = new Token(
//   'rest-createUserProfileDIToken'
// );
export const getUserDIToken = new Token('rest-getUserDIToken');
// export const deleteUserProfileDIToken = new Token(
//   'rest-deleteUserProfileDIToken'
// );
// export const updateUserProfileDIToken = new Token(
//   'rest-updateUserProfileDIToken'
// );

// export const getUserProfileInfoDIToken = new Token(
//   'rest-getUserProfileInfoDIToken'
// );

// export const getAccountDIToken = new Token('rest-getAccountDIToken');

export function registerUserInDIContainer(
  config: Config,
  pgConnection: DataSource
) {
  const logger = makeLogger(config);

  const userPresentor = new RESTUserPresenter();
  const userRepository = new UserRepository(pgConnection);

  // Container.set(
  //   createUserProfileDIToken,
  //   new CreateUserProfile(
  //     userProfilesPresentor,
  //     userProfilesRepository,
  //     userProfileCoursesRepository,
  //     userAccountsRepository,
  //     jwtRepository,
  //     logger
  //   )
  // );
  Container.set(
    getUserDIToken,
    new GetUsers(userPresentor, userRepository, logger)
  );

  // Container.set(
  //   getUserProfileInfoDIToken,
  //   new GetUserProfileInfo(
  //     userProfilesPresentor,
  //     userProfilesRepository,
  //     jwtRepository,
  //     logger
  //   )
  // );

  // Container.set(
  //   updateUserProfileDIToken,
  //   new UpdateUserProfile(userProfilesPresentor, userProfilesRepository, logger)
  // );

  // Container.set(
  //   getAccountDIToken,
  //   new GetAccountToken(
  //     userProfilesPresentor,
  //     userProfilesRepository,
  //     userAccountsRepository,
  //     jwtRepository,
  //     logger
  //   )
  // );
}
