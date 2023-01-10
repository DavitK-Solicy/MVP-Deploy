import { useContext, useEffect, useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Form, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Link from 'components/shared/link';
import Button from 'components/shared/button';
import { ButtonType } from 'components/shared/button/type';
import Input from 'components/shared/input';
import Recaptcha from 'components/shared/recaptcha';
import { useRouter } from 'next/router';
import CheckBox from 'components/shared/checkbox';
import Icon from 'components/shared/icon';
import notification from 'components/shared/notification';
import { AuthServiceContext } from 'utils/services/service/authService';
import * as localStorage from 'utils/services/localStorageService';
import { validMail } from 'utils/constants/steps';
import navBarPaths from 'utils/constants/navBarPaths';
import localStorageKeys from 'utils/constants/localStorageKeys';

import styles from './login.module.scss';

export default function Login(): JSX.Element {
  const authService = useContext(AuthServiceContext);
  const router = useRouter();
  const [form] = Form.useForm();
  const emailValidState = validMail(Form.useWatch('email', form));
  const [recaptchaIsSelected, setRecaptchaIsSelected] = useState<boolean>(
    false
  );
  let popup = null;

  const successfullyLogin = async (
    credentialResponse: CredentialResponse
  ): Promise<void> => {
    try {
      if (credentialResponse) {
        const res = await authService.loginByGoogle(
          credentialResponse.credential
        );
        if (res?.success) {
          router.push('/');
        } else {
          notification({
            messageType: 'error',
            message: 'Oops!',
            description: res?.error,
            className: styles.notification,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onTwitterLogin = async (): Promise<void> => {
    try {
      let check = setInterval(() => {
        if (!popup || popup.closed || popup.closed === undefined) {
          clearInterval(check);
        }
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (): Promise<void> => {
    const { email, password } = form.getFieldsValue();

    try {
      const res = await authService.login(email, password);
      if (res?.success) {
        localStorage.setItemInLocalStorage(localStorageKeys.EMAIL, email);
        router.push('/');
      } else {
        notification({
          messageType: 'error',
          message: 'Oops!',
          description: res.error,
          className: styles.notification,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isDisabled = (): boolean => {
    return (
      !form.isFieldsTouched(true) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
      !recaptchaIsSelected
    );
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginHeader}>Log In</div>
      <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <div className={styles.inputsContainer}>
          <Form.Item
            name="email"
            className={styles.formItem}
            rules={[
              {
                type: 'email',
                message: 'Invalid Email. Please try again.',
              },
              { required: true, message: 'Please enter your email address.' },
            ]}
          >
            <Input
              type="email"
              label="Email"
              className={styles.formEmailInput}
              prefix={
                !form.getFieldValue('email') ? (
                  !emailValidState
                ) : emailValidState ? (
                  <CheckOutlined style={{ color: '#26ab3e' }} />
                ) : null
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            className={styles.formItem}
            rules={[
              {
                message: 'The input is not valid password!',
              },
              { required: true, message: 'Please enter your password.' },
            ]}
          >
            <Input
              type="password"
              label="Password"
              className={styles.formInput}
            />
          </Form.Item>

          <div className={styles.forgotPassword}>
            <CheckBox text="Remember me" />
            <Link
              href={navBarPaths.recoverPassword}
              text="Forgot Password?"
              color="black"
            />
          </div>
          <div className={styles.recaptcha}>
            <Recaptcha onChange={setRecaptchaIsSelected} />
          </div>
        </div>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              className={styles.loginButton}
              text="Log In"
              htmlType="submit"
              disabled={isDisabled()}
              btnType={ButtonType.black}
            />
          )}
        </Form.Item>
        <div className={styles.signUp}>
          <p>Don't have an account?</p>
          <Link href={navBarPaths.signUp} text="Sign Up" />
        </div>
        <Divider>or</Divider>
        <div className={styles.authButtonsContainer}>
          <GoogleLogin
            type="icon"
            onSuccess={successfullyLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <div className={styles.authBtn}>
            <Icon
              src="twiterr.svg"
              width={24}
              height={24}
              onClick={onTwitterLogin}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
