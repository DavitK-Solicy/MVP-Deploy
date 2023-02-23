export interface EnvVariables {
  databaseConnectionUrl: string;
  port: number;
  apiBaseUrl: string;
}

const env: EnvVariables = {
  databaseConnectionUrl: process.env.DATABASE_CONNECTION_URL,
  apiBaseUrl:
    process.env.NEXT_PUBLIC_CUSTODIAL_BASE_URL ?? 'http://localhost:8080',
  port: Number(process.env.PORT),
};

export default env;
