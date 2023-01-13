export interface EnvVariables {
  tokenKey: string;
  secretJwtCode: string;
  databaseConnectionUrl: string;
  defaultEmail: string;
  defaultEmailPassword: string;
  clientId: string;
  deployedFrontendUrl: string;
  port: number;
  sessionSecret: string;
  bucketName: string;
  projectId: string;
}

const env: EnvVariables = {
  tokenKey: process.env.TOKEN_KEY ?? 'very_secret_token',
  secretJwtCode: process.env.SECRET_JWT_CODE ?? 'asl;dihf8#@GyOp',
  databaseConnectionUrl:
    process.env.DATABASE_CONNECTION_URL || 'mongodb://localhost:27017',
  defaultEmail: process.env.DEFAULT_EMAIL,
  defaultEmailPassword: process.env.DEFAULT_EMAIL_PASSWORD,
  port: Number(process.env.PORT) ?? 8080,
  clientId: process.env.CLIENT_ID ?? '',
  deployedFrontendUrl: '',
  sessionSecret: process.env.SESSION_SECRET ?? 'very_secret_token',
  bucketName: process.env.BUCKET_NAME,
  projectId: process.env.PROJECT_ID,
};

export default env;
