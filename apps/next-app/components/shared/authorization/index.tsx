import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'antd';
import Link from 'components/shared/link';
import Button from 'components/shared/button';
import { ButtonType } from 'components/shared/button/type';
import Input from 'components/shared/input';
import Icon from 'components/shared/icon';
import Image from 'components/shared/image';
import Notification from 'components/shared/notification';
import * as localStorage from 'utils/services/localStorageService';
import { AuthServiceContext } from 'utils/services/service/authService';
import localStorageKeys from 'utils/constants/localStorageKeys';
import navBarPaths from 'utils/constants/navBarPaths';
import { imagesPng, imagesSvg } from 'utils/constants/imagesSrc';
import { warningModalContent } from 'utils/constants/fakeData';
import { AuthorizationProps } from './types';

import styles from './authorization.module.scss';

export default function Authorization({
  isLogin = true,
}: AuthorizationProps): JSX.Element {
  const [form] = Form.useForm();
  const authService = useContext(AuthServiceContext);
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const isDisabled = (): boolean => {
    return (
      !form.isFieldsTouched(true) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length
    );
  };

  const onFinish = async (): Promise<void> => {
    const { email, password, fullName } = form.getFieldsValue();

    let res;
    if (isLogin) {
      res = await authService.login(email, password);
    } else {
      res = await authService.signup(fullName, email, password);
    }

    if (res?.success) {
      localStorage.setItemInLocalStorage(
        localStorageKeys.EMAIL,
        res?.user?.email
      );
      router.push('/');
    } else {
      Notification(res?.error, warningModalContent.filedModalIcon);
    }
  };

  return (
    <div>
      <div className={styles.loginPage}>
        <div className={styles.bannerImage}>
          <Image
            src={
              isLogin ? imagesPng.loginPageBanner : imagesPng.signupPageBanner
            }
            width="830"
            height="750"
          />
        </div>
        <div className={styles.loginFormContainer}>
          <div className={styles.logoContainer}>
            <Image src={imagesSvg.cryptoPoolLogo} width="260" height="100" />
          </div>
          <div className={styles.loginHeader}>
            {isLogin ? 'Login' : 'Sign Up'}
          </div>
          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className={styles.inputsContainer}>
              {!isLogin && (
                <Form.Item
                  name="fullName"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Full Name',
                    },
                    {
                      required: true,
                      message: 'Please enter your email id address.',
                    },
                  ]}
                >
                  <Input label="Full Name" className={styles.formEmailInput} />
                </Form.Item>
              )}

              <Form.Item
                name="email"
                className={styles.formItem}
                rules={[
                  {
                    type: 'email',
                    message: 'Invalid Email. Please try again.',
                  },
                  {
                    required: true,
                    message: 'Please enter your email address.',
                  },
                ]}
              >
                <Input
                  type="email"
                  label="Email"
                  className={styles.formEmailInput}
                />
              </Form.Item>
              <div className={styles.formItem}>
                <div className={styles.eyeIcon}>
                  <Icon
                    src={imagesSvg.hiddenIcon}
                    className={styles.eye}
                    width={23}
                    height={23}
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                </div>
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
                    type={passwordVisible ? 'text' : 'password'}
                    label="Password"
                    className={styles.formInput}
                  />
                </Form.Item>
              </div>
            </div>
            {isLogin && (
              <div className={styles.linkSection}>
                <Link
                  href={navBarPaths.resetPassword}
                  text="Forgot Password?"
                />
              </div>
            )}
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  className={styles.loginButton}
                  text={isLogin ? 'Log In' : 'Sign Up'}
                  htmlType="submit"
                  disabled={isDisabled()}
                  btnType={ButtonType.black}
                />
              )}
            </Form.Item>
            <div className={styles.signUp}>
              <p>
                {isLogin ? "Don't have a account" : 'Already have a account'}
              </p>
              <Link
                href={isLogin ? navBarPaths.signUp : navBarPaths.login}
                text={isLogin ? 'Signup' : 'Login'}
              />
            </div>
            <div className={styles.moreInfo}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
