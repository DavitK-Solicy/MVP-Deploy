export interface EnvVariables {
  databaseConnectionUrl: string;
  port: number;
}

const env: EnvVariables = {
  databaseConnectionUrl:
    process.env.DATABASE_CONNECTION_URL ?? 'mongodb://localhost:27017',
  port: Number(process.env.PORT) ?? 8081,
};

export default env;
