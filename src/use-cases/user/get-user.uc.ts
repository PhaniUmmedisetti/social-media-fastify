import { ILogger } from 'cross-cutting';
import { customErrorMessages, customErrorMessage } from 'utils/constants';

import { UserRepository } from 'infra/postgres/user/user.repository';
import { GetUserRequest } from 'interfaces/auth/user-request';
import { UserPresenter } from 'interfaces/auth/user-presenter';

export class GetUsers<ResponseType> {
  constructor(
    private readonly presenter: UserPresenter<ResponseType>,
    private readonly repository: UserRepository,
    private readonly logger: ILogger
  ) {}

  async execute(request: GetUserRequest): Promise<ResponseType> {
    console.log('use case executed');
    try {
      const [Users] = await Promise.all([
        this.repository.getAllUsers({}),
        // this.repository.getTotalNumberOfUsers({ accountId: request.id }),
      ]);
      const totalUsers = 1;

      if (!Users) {
        const msg = customErrorMessage(customErrorMessages.notFound);
        this.logger.info(msg);
        return this.presenter.notFound(msg);
      }
      // const jwtTokenForProfiles: any = profiles.map(
      //   async (profileInfo: any) => {
      //     const profileToken =
      //       await this.jwtRepository.createAccessTokenForProfile(profileInfo);
      //     return { ...profileInfo, ...profileToken };
      //   }
      // );
      // const updatedProfilesWithJwt = await Promise.all(jwtTokenForProfiles);

      return this.presenter.showUsers(Users, totalUsers);
    } catch (e: any) {
      this.logger.error(e);
      return this.presenter.databaseError(
        customErrorMessage(customErrorMessages.datebaseError)
      );
    }
  }
}
