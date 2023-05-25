import { RegisterOptions } from 'fastify';
import { AppServer } from 'drivers/rest-api/server';
import { UserController } from './user.controller';

export function registerUsersRoutes(userController: UserController) {
  // const schema = new AuthUserProfilesSchema();
  return (
    server: AppServer,
    routeOptions: RegisterOptions = {},
    done: () => void
  ): void => {
    server.route({
      method: 'GET',
      url: '/users',
      handler: userController.getAllUsersHandler,
      // schema: schema.getUserProfileSchema(),
      // opts: { schema: {} }, RouteShorthandOptions
      ...routeOptions,
    });

    // server.route({
    //   method: 'GET',
    //   url: '/account/profile/inspect',
    //   handler: ProfilesController.introspectUserHandler,
    //   schema: schema.getIntroSpecSchema(),
    //   // opts: { schema: {} }, RouteShorthandOptions
    //   ...routeOptions,
    // });

    // server.route({
    //   method: 'POST',
    //   url: '/account/profiles',
    //   handler: ProfilesController.createUserProfileHandler,
    //   schema: schema.postUserProfileSchema(),
    //   // opts: { schema: {} }, RouteShorthandOptions
    //   ...routeOptions,
    // });

    // server.route({
    //   method: 'GET',
    //   url: '/account/profile_info',
    //   handler: ProfilesController.getUserProfileInfoHandler,
    //   schema: schema.getUserProfileInfoSchema(),
    //   ...routeOptions,
    // });
    // server.route({
    //   method: 'PUT',
    //   url: '/account/profile',
    //   handler: ProfilesController.updateUserProfileHandler,
    //   schema: schema.updateUserProfileSchema(),
    //   ...routeOptions,
    // });

    // server.route({
    //   method: 'GET',
    //   url: '/account/refresh_token',
    //   handler: ProfilesController.getAccountTokenHandler,
    //   schema: schema.getAccountTokenSchema(),
    //   ...routeOptions,
    // });

    done();
  };
}
