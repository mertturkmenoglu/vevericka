import { ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactComponent as Squirrel } from '../../assets/squirrel.svg';
import { Link } from 'react-router-dom';

export interface LandingHeroProps {
  className?: string;
}

function LandingHero({ className }: LandingHeroProps): JSX.Element {
  return (
    <div className={clsx('mx-8 mt-16 text-center sm:mt-32 sm:text-lg', className)}>
      <div className="mx-auto w-fit">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: 'keyframes' }}
        >
          <Squirrel
            className="h-24 w-24 text-berry sm:h-36 sm:w-36"
            viewBox="0 0 512 512"
          />
        </motion.div>
      </div>

      <h2 className="mt-8 text-2xl font-bold sm:mt-32 sm:text-5xl">We are the squirrels who say Vik!</h2>
      <div className="mt-8 space-y-4 sm:mt-16 sm:space-y-0">
        <p>Ok, I'm going to tell you the truth. We are nuts about squirrels.</p>
        <p>
          We like to chat and share. Why shouldn't we merge these two? A social media with the concept of squirrels.
        </p>

        <p>Oh god, sounds great! Right? You in? Or should I vik more and try to convince you?</p>
      </div>
      <Link
        to="/login"
        className={clsx(
          'mx-auto mt-4 flex w-fit items-center justify-center rounded-full bg-midnight py-1 px-4 text-white',
          'sm:mt-16 sm:py-2 sm:px-8',
          'transition delay-200 duration-200 ease-in hover:bg-opacity-80'
        )}
      >
        <span className="text-base">Get Started</span>
        <ArrowRightIcon className="ml-2 h-4 w-4 animate-pulse" />
      </Link>
    </div>
  );
}

export default LandingHero;
