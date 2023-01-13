import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'antd';
import Button from 'components/shared/button';
import { ButtonType } from 'components/shared/button/type';
import Input from 'components/shared/input';
import notification from 'components/shared/notification';
import Image from 'components/shared/image';
import Icon from 'components/shared/icon';
import { AuthServiceContext } from 'utils/services/service/authService';
import { imagesSvg } from 'utils/constants/imagesSrc';
import navBarPaths from 'utils/constants/navBarPaths';

import styles from './newPassword.module.scss';

export default function NewPassword(): JSX.Element {
  const router = useRouter();
  const authService = useContext(AuthServiceContext);
  const [form] = Form.useForm();

  const onFinish = async (): Promise<void> => {
    const { password } = form.getFieldsValue();
    const emailVerificationToken = router.asPath.split('=')[1];

    const res = await authService.updateForgottenPassword(
      password,
      emailVerificationToken
    );

    if (res?.success) {
      notification({
        messageType: 'success',
        message: 'Success',
        description: res.message,
        className: styles.notification,
      });

      router.push(navBarPaths.login);
    } else {
      notification({
        messageType: 'error',
        message: 'Oops!',
        description: res?.error ?? 'Something went wrong, please try again',
        className: styles.notification,
      });
    }
  };

  const isDisabled = (): boolean => {
    return (
      !form.isFieldsTouched(true) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.whiteContainer}>
          <div className={styles.logoContainer}>
            <Image src={imagesSvg.cryptoPoolLogo} width="260" height="100" />
          </div>
          <div className={styles.titleSection}>
            <h1>Create New Password</h1>
            <span>
              Your new password must be having A capital, Small letter, Numeric
              and at least 8 in length, to make it strong.
            </span>
          </div>
          <div>
            <Form
              form={form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <div className={styles.passwordContainer}>
                <Form.Item name="password" className={styles.formItem}>
                  <div className={styles.eyeIcon}>
                    <Icon src={imagesSvg.hiddenIcon} width={23} height={23} />
                  </div>
                  <Input
                    className={styles.formInput}
                    type="password"
                    label="Enter New Password"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Passwords don’t match.',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error('Passwords don’t match.')
                        );
                      },
                    }),
                  ]}
                >
                  <div className={styles.eyeIcon}>
                    <Icon src={imagesSvg.hiddenIcon} width={23} height={23} />
                  </div>
                  <Input
                    className={styles.formInput}
                    type="password"
                    label="Confirm password"
                  />
                </Form.Item>
              </div>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    className={styles.buttonContainer}
                    text="Done"
                    htmlType="submit"
                    btnType={ButtonType.black}
                    disabled={isDisabled()}
                  />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
