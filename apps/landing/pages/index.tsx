import { AppTimeline } from 'components/AppTimeline/AppTimeline';
import styles from 'styles/index.module.scss';

import { Countdown } from '../components/Countdown';

const targetDate = new Date(2022, 5, 10);

export const Index = () => {
  return (
    <div className={styles.landing}>
      <h1 className={styles.landing__title}>Get ready</h1>
      <Countdown targetDate={targetDate} />
      <AppTimeline />
    </div>
  );
};

export default Index;
