import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps): JSX.Element {
  return (
    <motion.div
      className={clsx('h-12 w-12 bg-amber-500', className)}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ['0%', '0%', '50%', '50%', '0%'],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
}

export default Loading;
