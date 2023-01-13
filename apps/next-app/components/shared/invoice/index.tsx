import { Form } from 'antd';
import Input from 'components/shared/input';
import Icon from 'components/shared/icon';
import { invoiceItems, InvoiceItem } from 'utils/constants/paymentsModal';
import { imagesSvg } from 'utils/constants/imagesSrc';

import styles from './invoice.module.scss';

export default function Invoice(): JSX.Element {
  const [form] = Form.useForm();

  const onFinish = async (): Promise<void> => {
    const { name, emailId, walletAddress, amount } = form.getFieldsValue();
    console.log(name, emailId, walletAddress, amount);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h1>Invoice</h1>
        <Icon src={imagesSvg.gradientLine} width={60} height={3} />
        <div>
          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className={styles.inputsContainer}>
              <Form.Item name="name" className={styles.formItem}>
                <Input
                  type="text"
                  label="Name"
                  className={styles.formElement}
                />
              </Form.Item>
              <Form.Item name="emailId" className={styles.formItem}>
                <Input
                  type="email"
                  label="Email Id"
                  className={styles.formElement}
                />
              </Form.Item>
              <Form.Item name="walletAddress" className={styles.formItem}>
                <Input
                  type="text"
                  label="Wallet Address"
                  className={styles.formElement}
                />
              </Form.Item>
              <div className={styles.amountSection}>
                <Form.Item name="amount" className={styles.formItem}>
                  <Input
                    type="text"
                    label="Amount"
                    className={styles.formElementAmount}
                  />
                </Form.Item>
                {invoiceItems.map(
                  (e: InvoiceItem, index: number): JSX.Element => (
                    <div>
                      <div
                        key={index}
                        className={`${styles.conversionType} ${
                          e.active && styles.activeConversion
                        }`}
                      >
                        <Icon src={e.icon} width={25} height={25} />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <Form.Item shouldUpdate>
              {() => (
                <button type="submit" className={styles.confirmButton}>
                  <div className={styles.invoiceConfirmButton}>
                    <h1>Send Invoice</h1>
                    <Icon src={imagesSvg.nextIcon} width={38} height={38} />
                  </div>
                </button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
