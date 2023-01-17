import { useContext, useEffect, useState } from 'react';
import ProfileInfo from 'components/shared/profileInfo';
import InfoCard from 'components/feature/profileInfoCard';
import ProfileDetails from 'components/feature/profileDetails';
import HelpFeedback from 'components/feature/helpFeedback';
import InviteFriend from 'components/feature/inviteFriend';
import ContentLayout from 'components/feature/contentLayout';
import { UserServiceContext } from 'utils/services/service/userService';
import { User } from 'utils/model/user';
import { imagesSvg } from 'utils/constants/imagesSrc';

import styles from './profile.module.scss';

export default function Profile(): JSX.Element {
  const userService = useContext(UserServiceContext);

  const [userInfo, setUserInfo] = useState<User>();

  const getCurrentUser = async (): Promise<void> => {
    const res = await userService.getCurrentUser();
    if (res) setUserInfo(res.data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <ContentLayout title="Good Evening" isClock={true}>
      <div className={styles.container}>
        <div className={styles.profileInfoSection}>
          <ProfileInfo fullName={userInfo?.fullName} email={userInfo?.email} />
        </div>
        <div className={styles.cardsSection}>
          <InfoCard
            iconSrc={imagesSvg.userCard}
            title="Profile Information"
            data={[
              {
                dataTitle: 'Username',
                dataInfo: userInfo?.fullName,
              },
              {
                dataTitle: 'Email Id',
                dataInfo: userInfo?.email,
              },
              {
                dataTitle: 'Password',
                dataInfo: '*****',
                isStrong: true,
              },
            ]}
          />
          <InfoCard
            iconSrc={imagesSvg.bankCard}
            title="Bank Account Details"
            data={[
              {
                dataTitle: 'Account Number',
                dataInfo: userInfo?.bankAccount?.accountNumber,
              },
              {
                dataTitle: 'IFSC Code Or Swift Code',
                dataInfo: userInfo?.bankAccount?.ifscOrSwiftCode,
              },
              {
                dataTitle: 'Card Number',
                dataInfo: userInfo?.bankAccount?.cardNumber,
                isHidden: true,
                isStrong: false,
              },
            ]}
          />
          <ProfileDetails />
        </div>
        <div className={styles.footerPart}>
          <HelpFeedback />
          <InviteFriend />
        </div>
      </div>
    </ContentLayout>
  );
}
