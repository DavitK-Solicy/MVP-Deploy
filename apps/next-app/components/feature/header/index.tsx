import { useRouter } from 'next/router';
import Icon from 'components/shared/icon';
import SearchInput from 'components/shared/searchInput';
import { imagesSvg } from 'utils/constants/imagesSrc';
import navBarPaths from 'utils/constants/navBarPaths';
import { HeaderProps } from './types';

import styles from './header.module.scss';

export default function Header({ fullName }: HeaderProps): JSX.Element {
  const router = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.buttonsSection}>
        <div className={styles.arrowLeftBtn}>
          <Icon src={imagesSvg.arrowRightFirst} width={9} height={15} />
        </div>
        <div className={styles.arrowRightBtn}>
          <Icon src={imagesSvg.arrowRightFirst} width={9} height={15} />
        </div>
      </div>
      <div className={styles.headerRightSection}>
        <SearchInput
          className={styles.headerSearchInput}
          searchIcon={imagesSvg.search}
          closeIcon={imagesSvg.closeIcon}
        />
        <div
          className={styles.userSection}
          onClick={() => router.push(navBarPaths.profile)}
        >
          <p className={styles.userLogo}>{fullName?.trimStart()[0]}</p>
          <div className={styles.userName}>{fullName}</div>
          <div className={styles.arrowRightBtn}>
            <Icon src={imagesSvg.arrowRightFirst} width={6} height={10} />
          </div>
        </div>
      </div>
    </header>
  );
}
