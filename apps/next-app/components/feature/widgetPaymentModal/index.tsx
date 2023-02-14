import { useState } from 'react';
import PayWidgetScreen from 'components/shared/payWidgetScreen';
import CongratsWidgetScreen from 'components/shared/congratsWidgetScreen';
import QrPayWidgetScreen from 'components/shared/qrPayWidgetScreen';
import Modal from 'components/shared/modal';
import { WidgetPaymentModalProps } from './types';

import styles from './widgetPaymentModal.module.scss';

export default function WidgetPaymentModal({
  open,
  setOpen,
  orderDetails,
  primaryWalletId,
}: WidgetPaymentModalProps): JSX.Element {
  const [modal, setModal] = useState<number>(1);
  const [usdt, setUsdt] = useState<number>();

  const currentModal = (): JSX.Element => {
    switch (modal) {
      case 1:
        return (
          <PayWidgetScreen
            setModal={setModal}
            payAmount={orderDetails.total}
            setUsdt={setUsdt}
          />
        );
      case 2:
        return (
          <QrPayWidgetScreen
            setModal={setModal}
            usdt={usdt}
            orderDetails={orderDetails}
            primaryWalletId={primaryWalletId}
          />
        );
      case 3:
        return <CongratsWidgetScreen />;
    }
  };

  return (
    <Modal
      isModalVisible={open}
      onCancel={() => setOpen(false)}
      className={styles.widgetPaymentModal}
      closable={false}
    >
      {currentModal()}
    </Modal>
  );
}
