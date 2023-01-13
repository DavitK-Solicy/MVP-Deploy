import { useRouter } from 'next/router';
import { Form } from 'antd';
import Icon from 'components/shared/icon';
import Image from 'components/shared/image';
import Input from 'components/shared/input';
import Button from 'components/shared/button';
import Link from 'components/shared/link';
import { ButtonType } from 'components/shared/button/type';
import { imagesSvg } from 'utils/constants/imagesSrc';
import navBarPaths from 'utils/constants/navBarPaths';
import { AuthorizationPasswordProps, PageType } from './types';

import styles from './authorizationPassword.module.scss';

export default function AuthorizationPassword({
  pageType = PageType.RESET_PASSWORD,
}: AuthorizationPasswordProps): JSX.Element {
  const [form] = Form.useForm();
  const router = useRouter();
  // TODO {check user found or not}
  const userDefine = true;

  const onFinish = async (): Promise<void> => {
    const { email, code } = form.getFieldsValue();
    // TODO {get input value}
    console.log(email, code);
  };

  const isDisabled = (): boolean => {
    return (
      !form.isFieldsTouched(true) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length
    );
  };

  const checkEmail = (): void => {
    if (userDefine && pageType === PageType.RESET_PASSWORD) {
      router.push(navBarPaths.checkMail);
    } else router.push(navBarPaths.createNewPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.whiteContainer}>
          <div className={styles.logoContainer}>
            <Image src={imagesSvg.cryptoPoolLogo} width="260" height="100" />
          </div>
          <div className={styles.titleSection}>
            <div className={styles.titleIconContainer}>
              <h1>
                {pageType === PageType.RESET_PASSWORD
                  ? 'Reset Password'
                  : 'Check Your Mail'}
              </h1>
              {pageType === PageType.CHECK_EMAIL && (
                <Icon src={imagesSvg.checkMail} width={25} height={25} />
              )}
            </div>
            <span>
              {pageType === PageType.RESET_PASSWORD
                ? 'Enter the email associated with your account and we’ll send an email with a code to reset your password'
                : 'We have sent a password reset code to your email, please enter that below and Create a New Password'}
            </span>
          </div>
          <div>
            <Form
              form={form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name={pageType === PageType.RESET_PASSWORD ? 'email' : 'code'}
                className={styles.formItem}
              >
                <Input
                  type={
                    pageType === PageType.RESET_PASSWORD ? 'email' : 'number'
                  }
                  label={
                    pageType === PageType.RESET_PASSWORD
                      ? 'Email Address'
                      : 'Code'
                  }
                  className={styles.formInput}
                />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    className={styles.buttonContainer}
                    text={
                      pageType === PageType.RESET_PASSWORD
                        ? 'Send Code'
                        : 'Next'
                    }
                    htmlType="submit"
                    disabled={isDisabled()}
                    btnType={ButtonType.black}
                    onClick={() => checkEmail()}
                  />
                )}
              </Form.Item>
              <div className={styles.linkSection}>
                <p>Don't have a account</p>
                <Link href={navBarPaths.signUp} text="Signup" />
              </div>
              <div className={styles.moreInfo}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  aliquip ex ea commodo consequat.
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
