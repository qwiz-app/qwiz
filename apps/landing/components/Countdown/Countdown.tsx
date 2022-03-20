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
      time: days,
      text: 'days',
    },
    {
      time: hours,
      text: 'hours',
    },
    {
      time: minutes,
      text: 'minutes',
    },
    {
      time: seconds,
      text: 'seconds',
    },
  ];

  return (
    <div className={styles.countdown}>
      {times.map(({ time, text }) => (
        <AnimatedTime time={time} key={text} text={text} />
      ))}
    </div>
  );
};

interface TimeProps {
  time: string;
  text: string;
}

const AnimatedTime: FC<TimeProps> = ({ time, text }) => {
  const splitTime = time.split('');

  return (
    <div className={styles.countdown__time_wrapper}>
      {splitTime.map((digit) => (
        <AnimatePresence>
          <motion.h1
            exit={{ y: 75, opacity: 0, position: 'absolute' }}
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ease: 'easeOut',
              duration: 0.5,
            }}
            key={digit}
            className={styles.countdown__time}
          >
            {digit}
          </motion.h1>
        </AnimatePresence>
      ))}
    </div>
  );
};
