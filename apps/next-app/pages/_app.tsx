import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import { AuthProvider } from 'utils/context/auth/provider';
import { SocketProvider } from 'utils/context/socket/provider';
import { GlobalServices } from 'utils/services/service/globalServices';
import Layout from 'components/feature/layout';
import SEO from 'components/global/SEO';
import env from 'utils/constants/env';

import 'antd/dist/antd.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <SEO />
      <GoogleOAuthProvider clientId={env.googleApiKey}>
        <GlobalServices>
          <AuthProvider>
            <SocketProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SocketProvider>
          </AuthProvider>
        </GlobalServices>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
