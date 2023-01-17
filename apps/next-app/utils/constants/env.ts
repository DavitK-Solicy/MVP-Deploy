export interface EnvVariables {
  nextPublicApiBaseUrl: string;
  googleApiKey: string;
}

const env: EnvVariables = {
  nextPublicApiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080',
  googleApiKey: process.env.GOOGLE_AUTH_CLIENT_ID ?? '',
};

export default env;
