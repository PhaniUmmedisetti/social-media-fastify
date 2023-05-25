import { DataSource } from 'typeorm';
import { Config } from 'cross-cutting';
import { registerUserInDIContainer } from './user/user.register';

export function createDIContainer(
  config: Config,
  pgConnection: DataSource
): void {
  //application
  // registerApplicationInDIContainer(config,pgConnection,redisConnector);

  // //auth
  registerUserInDIContainer(config, pgConnection);
  // registerUserProfileCoursesInDIContainer(config, pgConnection);
  // registerUserAccountsInDIContainer(config, pgConnection, redisConnector);

  // //cms
  // registerUserCMSProfileInDIContainer(config, pgConnection);
  // registerRolesInDIContainer(config, pgConnection);
  // registerRoutesInDIContainer(config, pgConnection,redisConnector);

  // //internal
  // registerInternalRoutesInDIContainer(config,pgConnection,redisConnector)
}
