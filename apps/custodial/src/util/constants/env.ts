export interface EnvVariables {
  sessionSecret: string;
  databaseConnectionUrl: string;
  port: number;
}

const env: EnvVariables = {
  databaseConnectionUrl:
    process.env.DATABASE_CONNECTION_URL || 'mongodb://localhost:27017',
  port: Number(process.env.PORT) ?? 8080,
  sessionSecret: process.env.SESSION_SECRET ?? 'very_secret_token',
};

export default env;
