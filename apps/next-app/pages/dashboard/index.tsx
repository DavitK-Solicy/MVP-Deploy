import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import Image from 'components/shared/image';
import Modal from 'components/shared/modal';
import CryptoMarket from 'components/shared/cryptoMarket';
import hrefIcon from 'public/icons/goTo.svg';
import closeIcon from 'public/icons/close.svg';
import successIcon from 'public/icons/success.svg';
import gradientLine from 'public/icons/gradientLine.svg';
import nextStepIcon from 'public/icons/next-icon.svg';
import {
  conversionType,
  ConversionTypeProps,
  paymentsModal,
  PaymentsModalProps,
} from 'utils/constants/paymentsModal';

import styles from './dashboard.module.scss';

export default function index() {
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState<boolean>(false);

  return (
    <div>
      <CryptoMarket />
      <button type="button" onClick={() => setOpenPaymentModal(true)}>
        Modal1
      </button>
      <button type="button" onClick={() => setOpenWithdrawModal(true)}>
        Modal2
      </button>

      <Modal
        isModalVisible={openPaymentModal}
        onCancel={() => setOpenPaymentModal(false)}
        className={styles.paymentModal}
        closable={false}
      >
        <h1 className={styles.modalTitle}>Accept Payment through</h1>
        {paymentsModal.map(
          (e: PaymentsModalProps): JSX.Element => {
            return (
              <div className={styles.modalItem}>
                <div className={styles.imageBox}>
                  <Image
                    src={e.icon}
                    width={e.width}
                    height={e.height}
                    className={styles.icon}
                  />
                </div>
                <span className={styles.title}>{e.title}</span>
                <Image src={hrefIcon} width={6} height={10} />
              </div>
            );
          }
        )}
      </Modal>

      <Modal
        isModalVisible={openWithdrawModal}
        onCancel={() => setOpenWithdrawModal(false)}
        className={styles.withdrawModal}
        closeIcon={<Image src={closeIcon} width={22} height={22} />}
      >
        <div className={styles.titleSection}>
          <h1>Withdraw</h1>
          <Image src={gradientLine} width={60} height={3} />
        </div>
        <div>
          <div className={styles.firstSection}>
            <div>
              <h3>Balance</h3>
              <h1>$772.50*</h1>
              <div className={styles.informationSection}>
                <p>*Transaction fees are included</p>
                <InfoCircleOutlined />
              </div>
            </div>
            <div className={styles.rightSection}>
              <p>Conversion</p>
              <div className={styles.conversionContainer}>
                {conversionType.map(
                  (e: ConversionTypeProps): JSX.Element => {
                    return (
                      <div
                        className={`${styles.conversionType} ${
                          e.active && styles.activeConversion
                        }`}
                      >
                        <Image src={e.icon} width={25} height={25} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className={styles.secondSection}>
            <div className={styles.middleLine}>
              <Image src={gradientLine} width={30} height={5} />
            </div>
            <h1>Select your withdrawal currency</h1>
            {conversionType.map(
              (e: ConversionTypeProps): JSX.Element => {
                return (
                  <div className={styles.successWalletSelector}>
                    {e.active && (
                      <div className={styles.successIcon}>
                        <Image src={successIcon} width={25} height={25} />
                      </div>
                    )}
                    <div
                      className={`${styles.withdrawSelector} ${
                        e.active && styles.activeWithdrawSelector
                      }`}
                    >
                      <Image src={e.icon} width={20} height={20} />
                      <h1>{e.title}</h1>
                    </div>
                  </div>
                );
              }
            )}
            <span>
              *Any changes to the withdrawal currency will reflect after 24
              hours
            </span>
            <h2>Withdrawl Bank Account</h2>
            <div className={styles.bankSection}>
              {/*TODO image path */}
              <Image src="/icons/bank-icon.svg" width={28} height={28} />
              <h1>Bank number ending with ***374</h1>
            </div>
            <p>
              *To change, <span> click here </span>or got your profile screen
            </p>
          </div>
          <div className={styles.withdrawConfirmButton}>
            <h1>Withdraw</h1>
            <Image src={nextStepIcon} width={38} height={38} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
