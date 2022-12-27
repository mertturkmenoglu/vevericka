import { ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export interface LandingHeroProps {
  className?: string;
}

function LandingHero({ className }: LandingHeroProps): JSX.Element {
  return (
    <div className={clsx('mx-8 mt-16 text-center sm:mt-32 sm:text-lg', className)}>
      <h2 className="text-2xl font-bold sm:text-5xl">We are the squirrels who say Vik!</h2>
      <div className="mt-8 space-y-4 sm:mt-16 sm:space-y-0">
        <p>Ok, I'm going to tell you the truth. We are nuts about squirrels.</p>
        <p>
          We like to chat and share. Why shouldn't we merge these two? A social media with the concept of squirrels.
        </p>

        <p>Oh god, sounds great! Right? You in? Or should I vik more and try to convince you?</p>
      </div>
      <a
        href="/login"
        className={clsx(
          'mx-auto mt-4 flex w-fit items-center justify-center rounded-full bg-midnight py-1 px-4 text-white',
          'sm:mt-16 sm:py-2 sm:px-8',
          'transition delay-200 duration-200 ease-in hover:bg-opacity-80'
        )}
      >
        <span className="text-base">Get Started</span>
        <ArrowRightIcon className="ml-2 h-4 w-4 animate-pulse" />
      </a>
    </div>
  );
}

export default LandingHero;
