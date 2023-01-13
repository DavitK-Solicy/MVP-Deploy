import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/shared/button';
import Loader from 'components/shared/loader';
import { ButtonType } from 'components/shared/button/type';
import { RedirectButtonItem, redirectButtons } from 'utils/constants/buttons';

import styles from './home.module.scss';

export default function HomePage(): JSX.Element {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const redirectTo = (link: string): void => {
    router.push(link);
  };

  const checkLoading = (): void => {
    setLoading(!(typeof window !== 'undefined'));
  };

  useEffect(() => {
    checkLoading();
  }, []);

  return (
    <div className={styles.admin}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Admin Dashboard</h1>
          <div className={styles.redirectButtons}>
            <div className={styles.buttons}>
              {redirectButtons.map(
                (item: RedirectButtonItem, index: number) => (
                  <Button
                    key={index}
                    text={item.text}
                    btnType={ButtonType.white}
                    onClick={() => redirectTo(item.link)}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
