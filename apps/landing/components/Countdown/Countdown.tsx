import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useCountdown } from 'hooks/countdown';

import styles from './Countdown.module.scss';

interface Props {
  targetDate: Date;
}

export const Countdown: FC<Props> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const times = [
    {
      value: days,
      unit: 'days',
    },
    {
      value: hours,
      unit: 'hours',
    },
    {
      value: minutes,
      unit: 'minutes',
    },
    {
      value: seconds,
      unit: 'seconds',
    },
  ];

  return (
    <div className={styles.countdown}>
      {times.map(({ value, unit }) => (
        <AnimatedTime value={value} key={unit} unit={unit} />
      ))}
    </div>
  );
};

interface TimeProps {
  value: string;
  unit: string;
}

const AnimatedTime: FC<TimeProps> = ({ value, unit }) => {
  return (
    <div className={styles.countdown__box}>
      <p className={styles.countdown__unit}>{unit}</p>
      <AnimatePresence>
        <motion.h2
          exit={{
            y: 25,
            opacity: 0,
            position: 'absolute',
            bottom: 0,
          }}
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
          }}
          key={value}
          className={styles.countdown__time}
        >
          {value}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};
