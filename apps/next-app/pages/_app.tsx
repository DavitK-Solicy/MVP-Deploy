import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import { AuthProvider } from 'utils/context/auth/provider';
import { GlobalServices } from 'utils/services/service/globalServices';
import env from 'utils/constants/env';
import Layout from 'components/feature/layout';
import SEO from 'components/global/SEO';

import 'antd/dist/antd.css';
import '../styles/globals.scss';


function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <SEO />
      <GoogleOAuthProvider clientId={env.googleApiKey}>
        <AuthProvider>
          <GlobalServices>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GlobalServices>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
