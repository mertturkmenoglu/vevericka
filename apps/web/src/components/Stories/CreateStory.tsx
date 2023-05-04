import { useMutation } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/24/outline';
import * as Slider from '@radix-ui/react-slider';
import clsx from 'clsx';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { createStoryDocument } from '../../graphql';
import { useUploadcare } from '../../hooks';
import { Dialog } from '../Dialog';

function CreateStory(): JSX.Element {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [duration, setDuration] = useState(5);
  const [createStory] = useMutation(createStoryDocument);
  const [mediaUrl, setMediaUrl] = useState('');
  const [endDate, setEndDate] = useState<Date | null>(null);

  useUploadcare({
    contextName: 'story-create',
    id: 'story-create',
    onDataOutput: (event) => {
      const e = event as CustomEvent;
      const medias = e.detail.data.map((item: { cdnUrl: string }) => item.cdnUrl);
      setMediaUrl(medias[0]);
    },
  });

  return (
    <>
      <button
        className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-berry/10"
        onClick={() => setIsCreateOpen(true)}
      >
        <PlusIcon className="h-6 w-6 text-berry" />
        <span className="sr-only">Create Story</span>
      </button>

      <Dialog
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      >
        <div className="w-full p-4">
          <div className="">
            <p className="text-lg font-semibold text-midnight dark:text-white">Create a new story</p>
          </div>

          <div className="space-y-8 py-16">
            <div id="story-create" />

            <div>
              <Slider.Root
                className="relative flex h-3 w-[200px] touch-none select-none items-center"
                defaultValue={[5]}
                value={[duration]}
                onValueChange={(v) => {
                  setDuration(v[0]);
                }}
                max={10}
                min={3}
                step={1}
                aria-label="Duration"
              >
                <Slider.Track className="relative h-[2px] grow rounded-full bg-midnight">
                  <Slider.Range className="absolute h-full rounded-full bg-berry" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-berry focus:outline-none" />
              </Slider.Root>

              <div>{duration} seconds</div>
            </div>

            <DateTimePicker
              value={endDate}
              onChange={setEndDate}
            />
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              className={clsx('rounded bg-midnight px-4 py-1 text-white transition duration-200 ease-in-out')}
              onClick={async () => {
                if (mediaUrl && mediaUrl !== '' && endDate) {
                  const response = await createStory({
                    variables: {
                      payload: {
                        duration,
                        source: mediaUrl,
                        endsAt: endDate?.toISOString(),
                      },
                    },
                  });

                  if ((response?.errors?.length ?? 0) > 0) {
                    console.error(response.errors);
                  } else {
                    setIsCreateOpen(false);
                  }
                }
              }}
            >
              Create
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default CreateStory;
