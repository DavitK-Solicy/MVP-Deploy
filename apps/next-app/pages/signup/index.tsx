import AuthBackground from 'components/shared/authLayout';
import Signup from 'components/feature/signup';

export default function LoginPage(): JSX.Element {
  return (
    <AuthBackground>
      <Signup />
    </AuthBackground>
  );
}
