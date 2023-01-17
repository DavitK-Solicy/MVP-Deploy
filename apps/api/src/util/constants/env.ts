export interface EnvVariables {
  secretJwtCode: string;
  databaseConnectionUrl: string;
  defaultEmail: string;
  defaultEmailPassword: string;
  clientId: string;
  deployedFrontendUrl: string;
  port: number;
  sessionSecret: string;
}

const env: EnvVariables = {
  secretJwtCode: process.env.SECRET_JWT_CODE ?? 'asl;dihf8#@GyOp',
  databaseConnectionUrl:
    process.env.DATABASE_CONNECTION_URL || 'mongodb://localhost:27017',
  defaultEmail: process.env.DEFAULT_EMAIL ?? 'cryptopooltesting@gmail.com',
  defaultEmailPassword:
    process.env.DEFAULT_EMAIL_PASSWORD ?? 'mmkgopxdgpikmixv',
  port: Number(process.env.PORT) ?? 8080,
  clientId: process.env.CLIENT_ID ?? '',
  deployedFrontendUrl: 'http://localhost:4200',
  sessionSecret: process.env.SESSION_SECRET ?? 'very_secret_token',
};

export default env;
