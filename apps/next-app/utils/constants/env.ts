export interface EnvVariables {
  captchaKey: string;
  nextPublicApiBaseUrl: string;
  googleApiKey: string;
  friendsInviteLink: string;
  templateId: string;
}

const env: EnvVariables = {
  nextPublicApiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8080',
  captchaKey:
    process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY ??
    '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  googleApiKey: process.env.GOOGLE_AUTH_CLIENT_ID ?? '',
  friendsInviteLink: process.env.FRIENDS_INVITE_LINK ?? '',
  templateId: process.env.TEMPLATE_ID ?? '',
};

export default env;
