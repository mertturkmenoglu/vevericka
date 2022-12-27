import clsx from 'clsx';

export interface LandingAppBarProps {
  className?: string;
}

function LandingAppBar({ className }: LandingAppBarProps): JSX.Element {
  return (
    <nav
      className={clsx(
        'container mx-auto flex items-center justify-between rounded-full bg-zinc-100 py-2 px-8',
        className
      )}
    >
      <div className="flex items-end space-x-8">
        <img
          src="/squirrel.svg"
          className="h-10 w-10"
          alt="App logo"
        />
        <h2 className="hidden font-mono text-2xl font-bold text-slate-900 sm:flex">Vevericka</h2>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="/login"
          className="rounded-full border-2 border-amber-500 py-1.5 px-4 text-sm font-medium text-amber-500 transition-all duration-500 ease-in-out hover:bg-amber-50"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="rounded-full bg-amber-500 py-1.5 px-4 text-sm font-medium text-amber-50"
        >
          Login
        </a>
      </div>
    </nav>
  );
}

export default LandingAppBar;
