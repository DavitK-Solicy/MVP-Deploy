export interface EnvVariables {
  databaseConnectionUrl: string;
  port: number;
}

const env: EnvVariables = {
  databaseConnectionUrl: process.env.DATABASE_CONNECTION_URL,
  port: Number(process.env.PORT),
};

export default env;
