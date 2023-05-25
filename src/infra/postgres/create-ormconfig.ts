import { DataSourceOptions } from 'typeorm';
import { Config } from 'cross-cutting/config';

export function createOrmConfig(config: Config) {
  // Check typeORM documentation for more information.
  const { host, port, database, username, password } = config.postgresConfig;
  const connectionOpts: DataSourceOptions = {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,

    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    // migrationsRun: true,

    // logging false for less overhead
    logging: false,

    // allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  };

  return connectionOpts;
}
