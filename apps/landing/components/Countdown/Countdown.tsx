import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useCountdown } from 'hooks/countdown';

import styles from './Countdown.module.scss';

interface Props {
  targetDate: Date;
}

export const Countdown: FC<Props> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <div className={styles.countdown}>
      <h1>
        <AnimatedTime time={days} text="days" />
        <AnimatedTime time={hours} text="hours" />
        <AnimatedTime time={minutes} text="minutes" />
        <AnimatedTime time={seconds} text="seconds" />
      </h1>
    </div>
  );
};

interface TimeProps {
  time: number;
  text: string;
}

const AnimatedTime: FC<TimeProps> = ({ time, text }) => {
  return (
    <span>
      <AnimatePresence>
        <motion.p
          exit={{ y: 75, opacity: 0, position: 'absolute' }}
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 0.5,
          }}
          key={time}
          className={styles.countdown__time}
        >
          {time}
        </motion.p>
      </AnimatePresence>{' '}
      {text}
    </span>
  );
};
