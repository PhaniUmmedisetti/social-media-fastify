import AWS from 'aws-sdk';
interface IObjectKeys {
  [key: string]: string | number | undefined;
}

export class Secret {
  private region: string | undefined;
  private accessKeyId: string | undefined;
  private secretAccessKey: string | undefined;
  private secret: string | undefined;

  constructor() {
    this.region = process.env.AWS_REGION;
    this.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    this.secret =
      'id-auth-service-' + (process.env.NODE_ENV || '').toLowerCase();
  }
  private retriveSecret = () => {
    {
      const client: any = new AWS.SecretsManager({
        region: this.region,
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      });
      return new Promise((resolve, reject) => {
        client.getSecretValue(
          { SecretId: this.secret },
          (err: any, data: any) => {
            let secretsJSON: IObjectKeys = {};
            if (err) {
              reject(err);
            } else {
              if ('SecretString' in data) {
                let secret: string | undefined = '';
                secret = data.SecretString;
                if (secret) {
                  secretsJSON = JSON.parse(secret);
                }
              }
              resolve(secretsJSON);
            }
          }
        );
      });
    }
  };

  private getSecrets = async () => {
    try {
      const secretObject = await this.retriveSecret();
      return secretObject;
    } catch (e : any) {
      throw new Error(e);
    }
  };

  public fetchSecrets = async () => {
    try {
      const secretInfo = await this.getSecrets();
      this.updateSecrets(secretInfo);
    } catch (e : any) {
      console.log('failed to fetch secrets : ', e.message);
    }
  };
  private updateSecrets = (secretInfo: any) => {
    process.env.NODE_ENV = secretInfo.NODE_ENV;
    process.env.PORT = secretInfo.PORT;
    process.env.POSTGRES_HOST = secretInfo.POSTGRES_HOST;
    process.env.POSTGRES_PORT = secretInfo.POSTGRES_PORT;
    process.env.POSTGRES_DATABASE = secretInfo.POSTGRES_DATABASE;
    process.env.POSTGRES_PASSWORD = secretInfo.POSTGRES_PASSWORD;
    process.env.POSTGRES_USERNAME = secretInfo.POSTGRES_USERNAME;
    process.env.AWS_ACCESS_KEY_ID = secretInfo.AWS_ACCESS_KEY_ID;
    process.env.AWS_SECRET_ACCESS_KEY = secretInfo.AWS_SECRET_ACCESS_KEY;
    process.env.ACCOUNT_JWT_TTL_IN_SECONDS =
      secretInfo.ACCOUNT_JWT_TTL_IN_SECONDS || 3600;
    process.env.PROFILE_JWT_TTL_IN_SECONDS = secretInfo.PROFILE_JWT_TTL_IN_SECONDS || 3600 * 24;
    process.env.CMS_JWT_TTL_IN_SECONDS = secretInfo.CMS_JWT_TTL_IN_SECONDS || 3600;
    process.env.ACCOUNT_JWT_ISSUER = secretInfo.ACCOUNT_JWT_ISSUER;
    process.env.PROFILE_JWT_ISSUER = secretInfo.PROFILE_JWT_ISSUER;
    process.env.CMS_JWT_ISSUER = secretInfo.CMS_JWT_ISSUER;
    process.env.ACCOUNT_JWT_SECRET = secretInfo.ACCOUNT_JWT_SECRET;
    process.env.PROFILE_JWT_SECRET = secretInfo.PROFILE_JWT_SECRET;
    process.env.CMS_JWT_SECRET = secretInfo.CMS_JWT_SECRET;
    process.env.UI_URL = secretInfo.UI_URI;
    process.env.AWS_REGION = secretInfo.AWS_REGION;
    process.env.SENDGRID_API_KEY = secretInfo.SENDGRID_API_KEY;
    process.env.UI_URI = secretInfo.UI_URI;
    process.env.TWILIO_ACCOUNT_SID = secretInfo.TWILIO_ACCOUNT_SID;
    process.env.TWILIO_AUTH_TOKEN = secretInfo.TWILIO_AUTH_TOKEN;
    process.env.AUTH_PREFIX_V1 = secretInfo.AUTH_PREFIX_V1;
    process.env.CMS_PREFIX_V1 = secretInfo.CMS_PREFIX_V1;
    process.env.INTERNAL_PREFIX_V1 = secretInfo.INTERNAL_PREFIX_V1;
    process.env.DUMMY_NUMBERS = secretInfo.DUMMY_NUMBERS;
    process.env.REDIS_TTL_IN_SECONDS = secretInfo.REDIS_TTL_IN_SECONDS;
    process.env.REDIS_URL = secretInfo.REDIS_URL;
    process.env.REDIS_ATTEMPTS = secretInfo.REDIS_ATTEMPTS;
    process.env.REDIS_HOST = secretInfo.REDIS_HOST;
    process.env.REDIS_PORT = secretInfo.REDIS_PORT;
    process.env.REDIS_PREFIX = secretInfo.REDIS_PREFIX;
    process.env.REDIS_PASS = secretInfo.REDIS_PASS;
    process.env.GUPSHUP_USER_ID = secretInfo.GUPSHUP_USER_ID;
    process.env.GUPSHUP_PASSWORD = secretInfo.GUPSHUP_PASSWORD;
    process.env.OTP_VALID_TILL_IN_SECONDS = secretInfo.OTP_VALID_TILL_IN_SECONDS;
    process.env.GOOGLE_CLIENT_ID = secretInfo.GOOGLE_CLIENT_ID;
  };
}
