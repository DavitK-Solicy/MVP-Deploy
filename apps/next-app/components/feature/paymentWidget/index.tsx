import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/shared/button';
import WidgetPaymentModal from 'components/feature/widgetPaymentModal';
import { UserServiceContext } from 'utils/services/service/userService';
import { User } from 'utils/model/user';

export interface OrderDetails {
  product: {
    name: string;
  };
  subTotal: number;
  currency: string;
  tax: number;
  total: number;
}

const orderDetails: OrderDetails = {
  product: {
    name: 'Adidas ball',
  },
  subTotal: 7,
  currency: 'dollar',
  tax: 3,
  total: 10,
};

export default function PaymentWidget(): JSX.Element {
  const router = useRouter();
  const userService = useContext(UserServiceContext);

  // This is identification token, it will have each merchant. With the help of this we will separate them.
  // if merchants want to implement our widget into their websites so they need to use this into url.
  // Something like this `
  // http:cryptoPool/paymentWidget?identificationToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNlZy5naGF6YXJpYW5AZ21haWwuY29tIiwiZnVsbE5hbWUiOiJTZXJnZXkgR2hhemFyeWFuIiwiaWF0IjoxNjc1ODU1MjcwfQ.Jx8zhUmR0UAFM0MQfHXZzwwKE2scPDhU3JmhUI4Ohng
  const identificationToken = router.asPath.split('=')[1];
  const [merchant, setMerchant] = useState<User>();

  const getMerchantInfo = async (): Promise<void> => {
    const merchant = await userService.getUserInfoByIdentificationToken(
      identificationToken
    );

    if (merchant?.success) setMerchant(merchant.data);
    else {
      // handle error
    }
  };

  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);

  const changePaymentModalVisibility = (): void => {
    setOpenPaymentModal(!openPaymentModal);
  };

  useEffect(() => {
    getMerchantInfo();
  }, [identificationToken]);

  return (
    <div>
      <Button
        htmlType="submit"
        text="Submit"
        widgetSrc={merchant?.embed}
        onClick={changePaymentModalVisibility}
      />
      <WidgetPaymentModal
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
        orderDetails={orderDetails}
        primaryWalletId={merchant?.primaryWalletId}
      />
    </div>
  );
}
