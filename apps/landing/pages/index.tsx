import styles from 'styles/index.module.scss';

import { Countdown } from '../components/Countdown';

const targetDate = new Date(2022, 4, 22);

export const Index = () => {
  return (
    <div className={styles.landing}>
      <Countdown targetDate={targetDate} />
    </div>
  );
};

export default Index;
