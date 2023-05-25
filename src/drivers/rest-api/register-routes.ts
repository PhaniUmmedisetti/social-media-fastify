import {
  Config,
  // makeLogger,
  // ILogger,
} from 'cross-cutting';

import { AppServer } from 'drivers/rest-api/server';
import { registerUsersRoutes } from './user/user.routes';
import { UserController } from './user/user.controller';

export async function registerRoutes(
  server: AppServer,
  config: Config
): Promise<AppServer> {
  // controllers
  const userController = new UserController();

  // API Routes Options
  const registerV1UserRouteOptions = {
    prefix: 'users/v1',
  };

  // user
  server.register(
    registerUsersRoutes(userController),
    registerV1UserRouteOptions
  );

  return server;
}
