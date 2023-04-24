import clsx from 'clsx';
import { items } from './data';

export interface FeaturesProps {
  className?: string;
}

function Features({ className }: FeaturesProps): JSX.Element {
  return (
    <div className={clsx('w-full', className)}>
      <h2 className="text-2xl font-bold">Amazing Features of Vevericka</h2>
      <div className="mt-16 grid grid-cols-2 gap-8">
        {items.map((item) => (
          <div
            className="flex"
            key={item.title}
          >
            <div
              className="relative h-[64px] w-[64px] bg-berry/10"
              style={{
                borderRadius: '16px 16px 16px 200px',
              }}
            >
              <item.icon className="absolute -bottom-2 -right-4 h-14 w-14 text-berry" />
            </div>

            <div className="mx-auto w-2/3">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 font-sans text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
