export interface EnvVariables {
  tokenKey: string;
  secretJwtCode: string;
  databaseConnectionUrl: string;
  defaultEmail: string;
  defaultEmailPassword: string;
  clientId: string;
  deployedFrontendUrl: string;
  port: number;
  twitterConsumerKey: string;
  twitterConsumerSecret: string;
  sessionSecret: string;
  oauthTwitterCallback: string;
  youSignApiKey: string;
  youSignUrl: string;
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
  youSignApiKey: process.env.YOUSIGN_API_KEY,
  youSignUrl: process.env.YOUSIGN_API_URL,
  clientId: process.env.CLIENT_ID ?? '',
  deployedFrontendUrl: '',
  sessionSecret: process.env.SESSION_SECRET ?? 'very_secret_token',
  oauthTwitterCallback: '',
  bucketName: process.env.BUCKET_NAME,
  projectId: process.env.PROJECT_ID,
  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
  twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
};

export default env;
