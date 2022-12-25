import { motion } from 'framer-motion';
import { useAppStore } from '../../stores';

function Home(): JSX.Element {
  const username = useAppStore((state) => state.username);
  return (
    <div>
      <div>Home Page</div>
      <div>{username}</div>
      <motion.div
        className="mx-32 mt-32 h-12 w-12 bg-amber-500"
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
    </div>
  );
}

export default Home;
