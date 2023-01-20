export interface EnvVariables {
  databaseConnectionUrl: string;
  secretJwtCode: string;
  defaultEmail: string;
  defaultEmailPassword: string;
  clientId: string;
  port: number;
  custodialBaseUrl: string;
}

const env: EnvVariables = {
  databaseConnectionUrl:
    process.env.DATABASE_CONNECTION_URL ?? 'mongodb://localhost:27017',
  secretJwtCode: process.env.SECRET_JWT_CODE ?? 'asl;dihf8#@GyOp',
  defaultEmail: process.env.DEFAULT_EMAIL ?? 'cryptopooltesting@gmail.com',
  defaultEmailPassword:
    process.env.DEFAULT_EMAIL_PASSWORD ?? 'mmkgopxdgpikmixv',
  port: Number(process.env.PORT) ?? 8080,
  clientId: process.env.CLIENT_ID ?? '',
  custodialBaseUrl:
    process.env.NEXT_PUBLIC_CUSTODIAL_BASE_URL ?? 'http://localhost:8081',
};

export default env;
