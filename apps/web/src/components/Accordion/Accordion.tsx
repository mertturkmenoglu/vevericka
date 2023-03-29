import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export interface AccordionData {
  title: string;
  content: React.ReactNode;
}
export interface AccordionProps {
  data: AccordionData[];
}

function Accordion({ data }: AccordionProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-4">
      {data.map((item) => (
        <Disclosure key={item.title}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between rounded bg-midnight px-4 py-2 text-white">
                <span>{item.title}</span>
                <ChevronRightIcon className={clsx('h-5 w-5', open ? 'rotate-90 transform' : '')} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-2">{item.content}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default Accordion;
