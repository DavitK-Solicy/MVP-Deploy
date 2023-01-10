import { Modal as AntdModal } from 'antd/lib';
import { ModalProps } from './types';

export default function Modal({
  children,
  isModalVisible,
  onCancel,
  ...rest
}: ModalProps): JSX.Element {
  return (
    <AntdModal
      visible={isModalVisible}
      onCancel={onCancel}
      footer={null}
      {...rest}
    >
      {children}
    </AntdModal>
  );
}
