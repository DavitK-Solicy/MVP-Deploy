import Modal from 'components/shared/modal';
import Icon from 'components/shared/icon';
import ScanQR from 'components/shared/scanQR';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { ScanQRModalProps } from './types';

import styles from './scan.module.scss';

export default function ScanQRModal({
  open,
  setOpen,
  setOpenParentModal,
}: ScanQRModalProps): JSX.Element {
  return (
    <Modal
      isModalVisible={open}
      onCancel={() => {
        setOpenParentModal && setOpenParentModal(true);
        setOpen(false);
      }}
      className={styles.container}
      closeIcon={<Icon src={imagesSvg.close} width={22} height={22} />}
    >
      <ScanQR />
    </Modal>
  );
}
