import Icon from 'components/shared/icon';
import SearchInput from 'components/shared/searchInput';
import Image from 'components/shared/image';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.buttonsSection}>
        <div className={styles.arrowLeftBtn}>
          <Icon src="arrowRight.svg" width={9} height={15} />
        </div>
        <div className={styles.arrowRightBtn}>
          <Icon src="arrowRight.svg" width={9} height={15} />
        </div>
      </div>
      <div className={styles.headerRightSection}>
        <SearchInput
          className={styles.headerSearchInput}
          searchIcon="searchIcon.svg"
          closeIcon="closeicon.svg"
        />
        <div className={styles.userSection}>
          <Image width={29} height={29} src="/image/userImage.png" />
          <div className={styles.userName}>Yamparala Rahul</div>
          <div className={styles.arrowRightBtn}>
            <Icon src="arrowRight.svg" width={5} height={8} />
          </div>
        </div>
      </div>
    </header>
  );
}
