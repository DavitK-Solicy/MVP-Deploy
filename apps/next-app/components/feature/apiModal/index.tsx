import Modal from 'components/shared/modal';
import Icon from 'components/shared/icon';
import Image from 'components/shared/image';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { ApiModalProps } from './types';

import styles from './apiModal.module.scss';

export default function ApiModal({
  open,
  setOpen,
  setOpenParentModal,
}: ApiModalProps): JSX.Element {
  return (
    <Modal
      isModalVisible={open}
      onCancel={() => {
        setOpenParentModal && setOpenParentModal(true);
        setOpen(false);
      }}
      className={styles.apiModal}
      closable={false}
    >
      <div className={styles.apiModalContent}>
        <div onClick={() => setOpen(false)} className={styles.modalCloseButton}>
          <Icon src={imagesSvg.crossIcon} width={7} height={7} />
        </div>
        <h1 className={styles.modalTitle}>API Button</h1>
        <p className={styles.modalDescription}>
          Select Button versions you would like to send or embed in your
          application
        </p>
        <div className={styles.otherPayments}>
          <Image src={imagesSvg.otherPaymentIcon} width={45} height={26} />
        </div>

        <div className={styles.cryptoCurrency}>
          <Image src={imagesSvg.cryptoCurrency} width={49} height={49} />
          <div className={styles.textSection}>
            <span>Pay in Cryptocurrency</span>
            <span>Safe & Secure by CryptoPool</span>
          </div>
          <div className={styles.checkedIcon}>
            <Icon src={imagesSvg.checkIcon} width={11} height={8} />
          </div>
        </div>
        <div className={styles.copyButton}>
          <span>Copy the API Link</span>
          <div className={styles.arrowRight}>
            <Icon src={imagesSvg.arrowRightSecond} width={20} height={10} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
