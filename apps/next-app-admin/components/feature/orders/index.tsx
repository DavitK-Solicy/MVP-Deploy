import { useContext, useEffect, useMemo, useState } from 'react';
import { DatePicker, Form, Select } from 'antd';
import moment from 'moment';
import Modal from 'components/shared/modal';
import Input from 'components/shared/input';
import Button from 'components/shared/button';
import Loader from 'components/shared/loader';
import WarningModal from 'components/shared/warningModal';
import notification from 'components/shared/notification';
import { ButtonType } from 'components/shared/button/type';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { ModalType } from 'utils/constants/enum';
import {
  acceptWarningModal,
  disabledCreateStartDate,
  handelCancel,
} from 'utils/helpers';
import PageTable from 'components/shared/table';
import { isDisabled } from 'utils/constants/companyValidation';
import { OrderServiceContext } from 'utils/services/service/orderService';
import { orderColumns } from 'utils/constants/columns';
import {
  CoinsOptionType,
  coinTypes,
  ordersStatuses,
  StatusOptionType,
} from 'utils/constants/selects';
import { OrderData } from 'types/order';

import styles from './order.module.scss';

export default function Order(): JSX.Element {
  const orderService = useContext(OrderServiceContext);

  const { Option } = Select;

  const [editForm] = Form.useForm();
  const [createForm] = Form.useForm();

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData>();
  const [defaultOrder, setDefaultOrder] = useState<OrderData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countOfPage, setCountOfPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [warningModalVisible, setWarningModalVisible] = useState<boolean>(
    false
  );
  const [
    defaultCreateFormValue,
    setDefaultCreateFormValue,
  ] = useState<OrderData>();
  const [order, setOrder] = useState<OrderData>(null);
  const [firstRefresh, setFirstRefresh] = useState<boolean>(true);
  const [modalType, setModalType] = useState<ModalType>();

  const getAllOrders = async (): Promise<void> => {
    const res = await orderService.getAllOrders(
      limit,
      limit * (currentPage - 1)
    );

    if (Array.isArray(res?.data)) {
      setCountOfPage(Math.ceil(res.count / limit) * 10);
      setOrders(res.data);
      setFirstRefresh(false);
    }
  };

  const setWarningModalVisibility = (): void => {
    setWarningModalVisible(!warningModalVisible);
  };

  const handleWarningModal = (): void => {
    acceptWarningModal(
      setWarningModalVisibility,
      modalType === ModalType.CREATE
        ? setCreateModalVisibility
        : setUpdateModalVisibility
    );
    createForm.resetFields();
  };

  const handleFormCancel = (value: boolean): void => {
    value
      ? handelCancel(
          defaultCreateFormValue,
          createForm.getFieldsValue(),
          setCreateModalVisibility,
          setWarningModalVisibility
        )
      : handelCancel(
          defaultOrder,
          selectedOrder,
          setUpdateModalVisibility,
          setWarningModalVisibility
        );
  };

  const handleEdit = (order: OrderData): void => {
    setDefaultOrder(
      JSON.parse(
        JSON.stringify({
          _id: order._id,
          title: order.title ?? '',
          type: order.type ?? '',
          amount: order.amount ?? '',
          status: order.status ?? '',
          orderDate: order.orderDate ?? '',
        })
      )
    );

    setSelectedOrder(
      JSON.parse(
        JSON.stringify({
          _id: order._id,
          title: order.title ?? '',
          type: order.type ?? '',
          amount: order.amount ?? '',
          status: order.status ?? '',
          orderDate: order.orderDate ?? '',
        })
      )
    );

    setUpdateModalVisibility();
  };

  useEffect(() => {
    getAllOrders();
  }, [currentPage, limit]);

  useEffect(() => {
    editForm.resetFields();
  }, [modalVisible]);

  const removeOrder = (order: OrderData = null): void => {
    setOrder(order);
  };

  const columns = [
    ...orderColumns,
    {
      title: 'Edit/Delete',
      key: 'changeOrder',
      tooltip: true,
      render: (order: OrderData) => (
        <div className={styles.buttonsContainer}>
          <Button
            isUpdatedButton={true}
            onClick={() => handleEdit(order)}
            btnType={ButtonType.edit}
            iconSrc={imagesSvg.editIcon}
          />
          <Button
            isUpdatedButton={true}
            onClick={() => removeOrder(order)}
            btnType={ButtonType.delete}
            iconSrc={imagesSvg.deleteIcon}
          />
        </div>
      ),
    },
  ];

  const setUpdateModalVisibility = (): void => {
    setModalType(ModalType.EDIT);
    setModalVisible(!modalVisible);
  };

  const setCreateModalVisibility = (): void => {
    setModalType(ModalType.CREATE);
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      const myTimeout = setTimeout(() => {
        setDefaultCreateFormValue(createForm.getFieldsValue());
        clearTimeout(myTimeout);
      }, 100);
    }
  };

  const handleEditOrder = async (values: OrderData): Promise<void> => {
    const updatedOrder = await orderService.updateOrder(
      values,
      selectedOrder._id
    );

    if (updatedOrder?.success) {
      notification({
        messageType: 'success',
        message: 'Success',
        description: 'Order successfully updated',
      });

      const foundOrder = orders.find(
        (order: OrderData) => order._id === updatedOrder.data._id
      );

      const foundOrderIndex = orders.indexOf(foundOrder);
      const newArray = [...orders];
      newArray[foundOrderIndex] = updatedOrder.data;
      setOrders(newArray);
    } else {
      notification({
        messageType: 'error',
        message: 'Oops!',
        description: 'Something went wrong, please try again.',
      });
    }
    setSelectedOrder(null);
    setUpdateModalVisibility();
  };

  const handleCreateOrder = async (values: OrderData): Promise<void> => {
    const createOrder = await orderService.createOrder(values);

    if (createOrder?.success) {
      notification({
        messageType: 'success',
        message: 'Success',
        description: 'Order successfully created',
      });
      getAllOrders();
    } else {
      notification({
        messageType: 'error',
        message: 'Oops!',
        description:
          createOrder?.error ?? 'Something went wrong, please try again.',
      });
    }
    createForm.resetFields();
    setCreateModalVisibility();
  };

  const handleDeleteOrder = async (id: string) => {
    const isDeleted = await orderService.deleteOrder(id);
    if (isDeleted?.success) {
      notification({
        messageType: 'success',
        message: 'Success',
        description: 'Order successfully deleted',
      });
      const arr = [...orders];
      const index = arr.indexOf(arr.find((item: OrderData) => item._id === id));
      arr.splice(index, 1);
      setOrders(arr);
      removeOrder();
    } else {
      notification({
        messageType: 'error',
        message: 'Oops!',
        description: 'Something went wrong, please try again.',
      });
    }
  };

  const disableButton = useMemo((): boolean => {
    return JSON.stringify(defaultOrder) === JSON.stringify(selectedOrder);
  }, [selectedOrder]);

  return orders.length || !firstRefresh ? (
    <div className={styles.container}>
      <WarningModal
        onCancel={() => removeOrder()}
        onAccept={() => handleDeleteOrder(order?._id)}
        visible={!!order}
        messageTitle={`Are you sure you want to delete ${order?.title} order`}
      />
      <PageTable
        headerText="Orders"
        dataSource={orders}
        creatingItem={'Order'}
        columns={columns}
        limit={limit}
        setLimit={setLimit}
        setCreateModalVisibility={setCreateModalVisibility}
        countOfPage={countOfPage}
        setCurrentPage={setCurrentPage}
      />

      <Modal
        title={modalType === ModalType.EDIT ? 'Edit Order' : 'Create order'}
        bodyStyle={{ overflow: 'auto' }}
        className={styles.createOrderModal}
        isModalVisible={modalVisible}
        onCancel={() =>
          handleFormCancel(modalType === ModalType.EDIT ? false : true)
        }
      >
        <>
          <WarningModal
            messageTitle="Are you sure you want to close this Modal?"
            visible={warningModalVisible}
            onAccept={handleWarningModal}
            onCancel={setWarningModalVisibility}
          />
          {modalType === ModalType.EDIT && (
            <Form
              layout="vertical"
              form={editForm}
              initialValues={{
                title: selectedOrder?.title,
                type: selectedOrder?.type,
                amount: selectedOrder?.amount,
                status: selectedOrder?.status,
                orderDate: moment(selectedOrder?.orderDate),
              }}
              onFinish={handleEditOrder}
            >
              <div className={styles.inputsContainer}>
                <Form.Item
                  name="title"
                  label="Title"
                  className={styles.formItem}
                  rules={[
                    { required: true, message: 'Please input Order Title' },
                  ]}
                >
                  <Input
                    type="name"
                    placeholder="Name"
                    onChange={(e) => {
                      setSelectedOrder({
                        ...selectedOrder,
                        title: e,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="type"
                  className={styles.descriptionTextArea}
                  label="Type"
                  rules={[
                    { required: true, message: 'Please input Coin Type' },
                  ]}
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    onChange={(e) => {
                      setSelectedOrder({
                        ...selectedOrder,
                        title: e,
                      });
                    }}
                  >
                    {coinTypes?.map((item: CoinsOptionType, index: number) => (
                      <Option value={item.value} key={index}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="Amount"
                  className={styles.formItemDescription}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Amount',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Amount"
                    type="number"
                    onChange={(e) => {
                      setSelectedOrder({
                        ...selectedOrder,
                        amount: e,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Order status',
                    },
                  ]}
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    onChange={(e) => {
                      setSelectedOrder({
                        ...selectedOrder,
                        status: e,
                      });
                    }}
                  >
                    {ordersStatuses?.map(
                      (item: StatusOptionType, index: number) => (
                        <Option value={item.value} key={index}>
                          {item.value}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="orderDate"
                  label="Order Date"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Order status',
                    },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    showTime
                    getPopupContainer={(trigger) => trigger.parentElement}
                    allowClear={false}
                    onChange={(e) => {
                      setSelectedOrder({
                        ...selectedOrder,
                        orderDate: e ? new Date(e.format()) : null,
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <div className={styles.modalButtonsContainer}>
                  <Button
                    className={styles.modalButtons}
                    text="Edit Order"
                    htmlType="submit"
                    disabled={disableButton}
                    btnType={ButtonType.black}
                  />
                  <Button
                    className={styles.modalButtons}
                    onClick={() => handleFormCancel(false)}
                    text="Cancel"
                    btnType={ButtonType.black}
                  />
                </div>
              </Form.Item>
            </Form>
          )}
          {modalType === ModalType.CREATE && (
            <Form
              layout="vertical"
              form={createForm}
              initialValues={{ remember: true }}
              onFinish={handleCreateOrder}
            >
              <div className={styles.inputsContainer}>
                <Form.Item
                  name="title"
                  label="Title"
                  className={styles.formItem}
                  rules={[
                    { required: true, message: 'Please input Order Title' },
                  ]}
                >
                  <Input type="name" placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="type"
                  className={styles.descriptionTextArea}
                  label="Type"
                >
                  <Select getPopupContainer={(trigger) => trigger.parentNode}>
                    {coinTypes?.map((item: CoinsOptionType, index: number) => (
                      <Option value={item.value} key={index}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="Amount"
                  className={styles.formItemDescription}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Amount',
                    },
                  ]}
                >
                  <Input placeholder="Enter Amount" type="number" />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Order status',
                    },
                  ]}
                >
                  <Select getPopupContainer={(trigger) => trigger.parentNode}>
                    {ordersStatuses?.map(
                      (item: StatusOptionType, index: number) => (
                        <Option value={item.value} key={index}>
                          {item.value}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="orderDate"
                  label="Order Date"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Order status',
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD"
                    getPopupContainer={(trigger) => trigger.parentElement}
                    className={styles.datePicker}
                    disabledDate={(e) => disabledCreateStartDate(e)}
                  />
                </Form.Item>
              </div>
              <div className={styles.buttonSection}>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      text="Submit"
                      htmlType="submit"
                      className={styles.signUpButton}
                      btnType={ButtonType.black}
                      disabled={isDisabled(createForm)}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    text="Cancel"
                    onClick={() => handleFormCancel(true)}
                    className={styles.rightButton}
                    btnType={ButtonType.white}
                  />
                </Form.Item>
              </div>
            </Form>
          )}
        </>
      </Modal>
    </div>
  ) : (
    <Loader />
  );
}
