import S from 'fluent-json-schema';
import envSchema from 'env-schema';

const dotenvFlow = require('dotenv-flow');
dotenvFlow.load([__dirname + '/../../environments/.env.dev']);

const postgresSchema = S.object()
  .prop('host', S.string().required())
  .prop('port', S.string().required())
  .prop('database', S.string().required())
  .prop('username', S.string().required())
  .prop('password', S.string().required());

const serverSchema = S.object()
  .prop('port', S.number().required())
  .prop('internalPrefixV1', S.string().required())
  .prop('uiURL', S.string())
  .prop('env', S.string().enum(['dev', 'prod']).required());

const configurationSchema = S.object()
  .prop('serverConfig', serverSchema)
  .prop('postgresConfig', postgresSchema);

interface IPostgresConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

interface IServerConfig {
  port: number;
  internalPrefixV1: string;
  uiURL: string;
  env: string;
}

export interface IConfiguration {
  serverConfig: IServerConfig;
  postgresConfig: IPostgresConfig;
  isProd: boolean;
  isDev: boolean;
}

export class Config implements IConfiguration {
  constructor() {
    this.validate();
  }

  get postgresConfig(): IPostgresConfig {
    return {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
    } as IPostgresConfig;
  }

  get serverConfig(): IServerConfig {
    return {
      port: Number(process.env.PORT) || 3003,
      internalPrefixV1: process.env.INTERNAL_PREFIX_V1 || 'internal/v1',
      uiURL: process.env.UI_URL || 'https://app.gtet.in',
      env: process.env.NODE_ENV,
    } as IServerConfig;
  }

  get isProd(): boolean {
    return process.env.NODE_ENV === 'prod';
  }
  get isDev(): boolean {
    return process.env.NODE_ENV === 'dev';
  }

  private validate(): void {
    envSchema({
      data: {
        serverConfig: this.serverConfig,
        postgresConfig: this.postgresConfig,
      },
      schema: configurationSchema,
    });
  }
}
