import { useState } from 'react';
import { Menu, Table } from 'antd';
import WhiteBox from 'components/shared/whiteBox';
import Dropdown from 'components/shared/dropDown';
import Modal from 'components/shared/modal';
import NotificationCard from 'components/shared/notificationCard';
import Icon from 'components/shared/icon';
import SearchInput from 'components/shared/searchInput';
import {
  orderColumns,
  tableData,
  warningModalContent,
} from 'utils/constants/fakeData';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { OrderStatus } from 'types/orders';
import DashboardTableProps, { ModalContent, OrderDataType } from './types';

import styles from './table.module.scss';

export default function DashboardTable({
  tableTitle,
  className,
  dataSource,
  countOfPage,
  setCurrentPage,
  rowKey,
  ...rest
}: DashboardTableProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>();

  const openWarningModal = (status: OrderStatus): void => {
    if (status == OrderStatus.FAILED) {
      setModalContent({
        title: warningModalContent.filedModalTitle,
        message: warningModalContent.filedModalMessage,
        cardType: warningModalContent.filedModalIcon,
      });
    } else {
      setModalContent({
        title: warningModalContent.wrongModalTitle,
        message: warningModalContent.wrongModalMessage,
        cardType: warningModalContent.wrongModalIcon,
      });
    }
    setOpen(true);
  };

  const statusColumn = [
    {
      title: 'Order Status',
      key: 'status',
      render: (item: OrderDataType) => (
        <div className={styles.orderStatusRow}>
          <span className={`${item.status}`}>{item.status}</span>
          {item.status != OrderStatus.DONE && (
            <Icon
              className={styles.statusIcon}
              src={imagesSvg.warning}
              width={20}
              height={20}
              onClick={() => openWarningModal(item.status)}
            />
          )}
        </div>
      ),
      ellipsis: true,
    },
  ];

  const columns = [...orderColumns, ...statusColumn];

  const menu: JSX.Element = (
    <Menu>
      <Menu.Item>Amount</Menu.Item>
      <Menu.Item>Date</Menu.Item>
      <Menu.Item>Status</Menu.Item>
    </Menu>
  );

  return (
    <>
      {open && (
        <Modal
          closable={false}
          bodyStyle={{
            paddingTop: 25,
            paddingLeft: 30,
            paddingBottom: 15,
            paddingRight: 20,
          }}
          isModalVisible={open}
          onCancel={() => setOpen(false)}
          className={styles.modal}
        >
          <NotificationCard
            setOpen={setOpen}
            title={modalContent.title}
            message={modalContent.message}
            cardType={modalContent.cardType}
            isModal
          />
        </Modal>
      )}
      <div className={styles.table}>
        <WhiteBox>
          <div className={styles.header}>
            <div className={styles.auxiliaryTools}>
              <span className={styles.title}>{tableTitle}</span>
              <Dropdown overlay={menu}>
                <span className={styles.filter}>
                  <>
                    <span>Filter</span>
                    <Icon src={imagesSvg.filter} width={11} height={11} />
                  </>
                </span>
              </Dropdown>
              <span className={styles.arrows}>
                <Icon src="arrows.svg" width={35} height={35} />
              </span>
            </div>
            <div className={styles.search}>
              <SearchInput searchIcon={imagesSvg.search} />
            </div>
          </div>
          <div className={className}>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={{ total: countOfPage }}
              // onChange={(e) => setCurrentPage(e.current)}
              rowKey={rowKey}
              {...rest}
            />
          </div>
        </WhiteBox>
      </div>
    </>
  );
}
