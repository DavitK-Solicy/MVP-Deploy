import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import Icon from 'components/shared/icon';
import WhiteBox from 'components/shared/whiteBox';
import Button from 'components/shared/button';
import Notification from 'components/shared/notification';
import { imagesSvg } from 'utils/constants/imagesSrc';

import styles from './sharedLink.module.scss';

export default function SharedLink(): JSX.Element {
  return (
    <div>
      <WhiteBox style={styles.whiteBox}>
        <div className={styles.container}>
          <span className={styles.header}>
            <h1 className={styles.title}>ShareLink</h1>
            <span className={styles.divider}></span>
          </span>
          <div className={styles.iconBox}>
            <FacebookShareButton url="/">
              <span className={styles.icon}>
                <Icon width={50} height={50} src={imagesSvg.facebook} />
                <p className={styles.iconText}>Facebook</p>
              </span>
            </FacebookShareButton>
            <span className={styles.icon}>
              <Icon width={50} height={50} src={imagesSvg.discord} />
              <p className={styles.iconText}>Discord</p>
            </span>
            <TwitterShareButton url="/">
              <span className={styles.icon}>
                <Icon width={50} height={50} src={imagesSvg.twitter} />
                <p className={styles.iconText}>Twitter</p>
              </span>
            </TwitterShareButton>
            <WhatsappShareButton url="/">
              <span className={styles.icon}>
                <Icon width={50} height={50} src={imagesSvg.whatsapp} />
                <p className={styles.iconText}>Whatsapp</p>
              </span>
            </WhatsappShareButton>
          </div>
          <p className={styles.label}>Link</p>
          <div className={styles.linkBox}>
            <div className={styles.link}>
              <p>random-mail@gmail.com</p>
            </div>
            <Button
              className={styles.button}
              img={imagesSvg.copy}
              text="Copy"
              onClick={() => Notification('Link is copied to clipbord')}
            />
          </div>
        </div>
      </WhiteBox>
    </div>
  );
}
