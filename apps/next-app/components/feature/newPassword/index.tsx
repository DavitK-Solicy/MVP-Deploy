import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'antd';
import Button from 'components/shared/button';
import { ButtonType } from 'components/shared/button/type';
import Input from 'components/shared/input';
import notification from 'components/shared/notification';
import { AuthServiceContext } from 'utils/services/service/authService';
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
      <h2>New Password</h2>
      <p>Your new password must be different from previous used passwords.</p>
      <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <div className={styles.inputsContainer}>
          <div className={styles.passwordContainer}>
            <Form.Item name="password" className={styles.formItemPassword}>
              <Input
                className={styles.formInput}
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
                  message: 'Passwords don’t match.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('Passwords don’t match.'));
                  },
                }),
              ]}
            >
              <Input
                className={styles.formInput}
                type="password"
                label="Confirm password"
                placeholder="Confirm Password"
              />
            </Form.Item>
          </div>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                text="Submit"
                htmlType="submit"
                disabled={isDisabled()}
                className={styles.signUpButton}
                btnType={ButtonType.black}
              />
            )}
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
