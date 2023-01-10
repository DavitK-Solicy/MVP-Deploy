import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Form, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Icon from 'components/shared/icon';
import Link from 'components/shared/link';
import Input from 'components/shared/input';
import Button from 'components/shared/button';
import CheckBox from 'components/shared/checkbox';
import Recaptcha from 'components/shared/recaptcha';
import notification from 'components/shared/notification';
import { ButtonType } from 'components/shared/button/type';
import navBarPaths from 'utils/constants/navBarPaths';
import { validMail } from 'utils/constants/steps';
import { AuthServiceContext } from 'utils/services/service/authService';

import styles from './signUp.module.scss';

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const authService = useContext(AuthServiceContext);
  const [form] = Form.useForm();
  const emailValidState = validMail(Form.useWatch('email', form));
  const [changeSuccess, setChangeSuccess] = useState<boolean>(null);
  const [conditions, setConditions] = useState<boolean>(false);
  const [recaptchaIsSelected, setRecaptchaIsSelected] = useState<boolean>(
    false
  );
  const [validPassword, setValidPassword] = useState<boolean>(false);
  let popup = null;

  const successfullySignUp = async (
    credentialResponse: CredentialResponse
  ): Promise<void> => {
    try {
      if (credentialResponse) {
        const res = await authService.signupByGoogle(
          credentialResponse.credential
        );
        if (res?.success) {
          router.push('/');
        } else {
          notification({
            messageType: 'error',
            message: 'Oops!',
            description: res?.error,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (): Promise<void> => {
    const { email, password } = form.getFieldsValue();

    try {
      const res = await authService.signup(email, password);
      if (res?.success) {
        router.push('/');
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

  const isDisabled = (): boolean => {
    const { password, confirm } = form.getFieldsValue();

    return (
      !form.isFieldsTouched(true) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
      password !== confirm ||
      !conditions ||
      !recaptchaIsSelected
    );
  };

  return (
    <div className={styles.signupFormContainer}>
      <div className={styles.signupHeader}>Sign Up</div>
      <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <div className={styles.inputsContainer}>
          <Form.Item
            name="email"
            className={styles.formItem}
            validateStatus="success"
            rules={[
              {
                type: 'email',
                message: 'Please enter valid email address.',
              },
              { required: true, message: 'Please input your Email!' },
            ]}
          >
            <Input
              type="email"
              label="Email"
              className={
                emailValidState
                  ? styles.formEmailSuccess
                  : styles.formEmailInput
              }
              placeholder="namesurname@mail.com"
              prefix={
                !form.getFieldValue('email') ? (
                  !emailValidState
                ) : emailValidState ? (
                  <CheckOutlined style={{ color: '#26ab3e' }} />
                ) : null
              }
            />
          </Form.Item>

          <div className={styles.passwordContainer}>
            <Form.Item
              name="password"
              className={styles.formItemPassword}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value) {
                      setValidPassword(true);
                      if (getFieldValue('confirm') === value) {
                        setChangeSuccess(true);
                      } else {
                        if (getFieldValue('confirm')) {
                          setChangeSuccess(false);
                        }
                      }
                      return Promise.resolve();
                    } else {
                      setValidPassword(false);
                    }
                    return Promise.reject(
                      new Error('Please input your Password!')
                    );
                  },
                }),
              ]}
            >
              <Input
                className={
                  validPassword ? styles.formSuccess : styles.formInput
                }
                type="password"
                label="Password"
                placeholder="Enter Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              className={styles.formItemPassword}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && getFieldValue('password') === value) {
                      setChangeSuccess(true);
                      return Promise.resolve();
                    } else if (!value) {
                      setChangeSuccess(null);
                      return Promise.reject();
                    } else if (getFieldValue('password') !== value) {
                      setChangeSuccess(false);
                    }
                  },
                }),
              ]}
            >
              <Input
                className={
                  changeSuccess === null
                    ? styles.formInput
                    : changeSuccess
                    ? styles.formSuccess
                    : styles.formFail
                }
                type="password"
                label="Confirm password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            {!changeSuccess && changeSuccess !== null && (
              <span className={styles.error}>Passwords don’t match</span>
            )}
          </div>
          <div className={styles.checkboxContainer}>
            <CheckBox
              onChange={(value) => setConditions(value.target.checked)}
              text="I agree to"
              data={[
                {
                  linkText: 'Terms & Conditions',
                  link: '/termsAndConditions',
                },
                {
                  linkText: 'Privacy Policy',
                  link: '/termsAndConditions',
                },
              ]}
            />
          </div>

          <div className={styles.recaptcha}>
            <Recaptcha onChange={setRecaptchaIsSelected} />
          </div>
        </div>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              text="Sign Up"
              htmlType="submit"
              className={styles.signUpButton}
              btnType={ButtonType.black}
              disabled={isDisabled()}
            />
          )}
        </Form.Item>

        <div className={styles.loginText}>
          <span>Already have an account?</span>
          <Link text="Log In" href={navBarPaths.login} />
        </div>

        <Divider>or</Divider>

        <div className={styles.authButtonsContainer}>
          <div className={styles.authBtn}>
            <GoogleLogin
              type="icon"
              onSuccess={successfullySignUp}
              onError={() => {
                console.log('Signup Failed');
              }}
            />
          </div>
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
